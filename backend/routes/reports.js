const express = require('express');
const { body, validationResult } = require('express-validator');
const Report = require('../models/Report');
const ServiceProvider = require('../models/ServiceProvider');
const { auth } = require('../middleware/auth');
const { analyzeReport, determineRequiredServices } = require('../utils/reportProcessor');
const { notifyEmergencyServices } = require('../utils/emergencyNotifier');

const router = express.Router();

// @route   POST /api/reports
// @desc    Create a new report
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('category').isIn(['criminal', 'civil', 'domestic_violence', 'harassment', 'theft', 'assault', 'fraud', 'property_damage', 'traffic_accident', 'medical_emergency', 'mental_health', 'cybercrime', 'discrimination', 'other']),
  body('incidentDate').isISO8601().withMessage('Please provide a valid incident date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reportData = {
      ...req.body,
      user: req.user._id
    };

    // Analyze the report content to determine severity and required services
    const analysis = analyzeReport(reportData.description, reportData.category);
    reportData.severity = analysis.severity;
    reportData.urgency = analysis.urgency;
    reportData.services_required = analysis.services_required;

    const report = new Report(reportData);
    await report.save();

    // If it's an emergency, automatically notify services
    if (report.urgency === 'emergency' || report.severity === 'critical') {
      try {
        await notifyEmergencyServices(report);
      } catch (notifyError) {
        console.error('Failed to notify emergency services:', notifyError);
      }
    }

    // Populate user information for response
    await report.populate('user', 'firstName lastName email phone');

    res.status(201).json({
      message: 'Report created successfully',
      report: report,
      analysis: {
        severity: analysis.severity,
        urgency: analysis.urgency,
        services_required: analysis.services_required,
        recommendations: analysis.recommendations
      }
    });

  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error while creating report' });
  }
});

// @route   GET /api/reports
// @desc    Get user's reports
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id };
    
    // Add status filter if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo.contactId', 'name contact type');

    const total = await Report.countDocuments(filter);

    res.json({
      reports,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
});

// @route   GET /api/reports/:id
// @desc    Get a specific report
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate([
      { path: 'user', select: 'firstName lastName email phone' },
      { path: 'assignedTo.contactId', select: 'name contact type specialization address' },
      { path: 'updates.author', select: 'firstName lastName role' }
    ]);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ report });

  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ message: 'Server error while fetching report' });
  }
});

// @route   PUT /api/reports/:id/status
// @desc    Update report status (for service providers)
// @access  Private
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'processing', 'in_progress', 'resolved', 'closed']),
  body('message').optional().trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, message } = req.body;
    
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user has permission to update (either the report creator or assigned service provider)
    const isOwner = report.user.toString() === req.user._id.toString();
    const isAssigned = report.assignedTo.some(assignment => 
      assignment.contactId && assignment.contactId.toString() === req.user._id.toString()
    );

    if (!isOwner && !isAssigned && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this report' });
    }

    report.status = status;
    
    if (message) {
      report.updates.push({
        message,
        author: req.user._id,
        type: 'status_update'
      });
    }

    await report.save();

    res.json({
      message: 'Report status updated successfully',
      report
    });

  } catch (error) {
    console.error('Update report status error:', error);
    res.status(500).json({ message: 'Server error while updating report' });
  }
});

// @route   POST /api/reports/:id/assign
// @desc    Assign services to a report
// @access  Private (Admin or emergency responder)
router.post('/:id/assign', auth, async (req, res) => {
  try {
    if (!['admin', 'emergency_responder'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to assign services' });
    }

    const { serviceType, contactId } = req.body;
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const serviceProvider = await ServiceProvider.findById(contactId);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    report.assignedTo.push({
      serviceType,
      contactId,
      assignedDate: new Date(),
      status: 'assigned'
    });

    report.updates.push({
      message: `${serviceType} service assigned to ${serviceProvider.name}`,
      author: req.user._id,
      type: 'assignment'
    });

    await report.save();

    res.json({
      message: 'Service assigned successfully',
      report
    });

  } catch (error) {
    console.error('Assign service error:', error);
    res.status(500).json({ message: 'Server error while assigning service' });
  }
});

module.exports = router;