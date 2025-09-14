const express = require('express');
const ServiceProvider = require('../models/ServiceProvider');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get service providers with filtering and search
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      type,
      city,
      state,
      zipCode,
      specialization,
      emergency,
      page = 1,
      limit = 20,
      latitude,
      longitude,
      radius = 25
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (type) {
      query.type = type;
    }
    
    if (city) {
      query['address.city'] = new RegExp(city, 'i');
    }
    
    if (state) {
      query['address.state'] = new RegExp(state, 'i');
    }
    
    if (zipCode) {
      query['address.zipCode'] = zipCode;
    }
    
    if (specialization) {
      query.specialization = { $in: [specialization] };
    }
    
    if (emergency === 'true') {
      query.$or = [
        { isEmergency: true },
        { 'availability.emergency': true }
      ];
    }

    // Location-based search
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radius * 1609.34 // Convert miles to meters
        }
      };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const services = await ServiceProvider.find(query)
      .sort({ 'ratings.averageRating': -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await ServiceProvider.countDocuments(query);

    res.json({
      services,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error while fetching services' });
  }
});

// @route   GET /api/services/:id
// @desc    Get a specific service provider
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const service = await ServiceProvider.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    res.json({ service });

  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Server error while fetching service' });
  }
});

// @route   GET /api/services/emergency/nearest
// @desc    Get nearest emergency services
// @access  Private
router.get('/emergency/nearest', auth, async (req, res) => {
  try {
    const { latitude, longitude, services = 'police,medical,mental_health' } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location coordinates are required' });
    }

    const serviceTypes = services.split(',').map(s => {
      switch(s.trim()) {
        case 'police': return 'police_station';
        case 'medical': return 'hospital';
        case 'mental_health': return 'mental_health_center';
        case 'lawyer': return 'lawyer';
        case 'psychologist': return 'psychologist';
        default: return s.trim();
      }
    });

    const emergencyServices = await ServiceProvider.find({
      type: { $in: serviceTypes },
      isActive: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 50 * 1609.34 // 50 mile radius
        }
      }
    }).limit(10);

    res.json({ services: emergencyServices });

  } catch (error) {
    console.error('Get nearest emergency services error:', error);
    res.status(500).json({ message: 'Server error while fetching emergency services' });
  }
});

module.exports = router;