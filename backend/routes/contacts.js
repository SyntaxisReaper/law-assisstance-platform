const express = require('express');
const ServiceProvider = require('../models/ServiceProvider');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/contacts/lawyers
// @desc    Get list of lawyers
// @access  Private
router.get('/lawyers', auth, async (req, res) => {
  try {
    const { city, state, specialization, page = 1, limit = 10 } = req.query;
    
    const query = { 
      type: 'lawyer',
      isActive: true
    };
    
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');
    if (specialization) query.specialization = { $in: [specialization] };

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const lawyers = await ServiceProvider.find(query)
      .sort({ 'ratings.averageRating': -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select('name contact address specialization ratings');

    const total = await ServiceProvider.countDocuments(query);

    res.json({
      lawyers,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total
      }
    });

  } catch (error) {
    console.error('Get lawyers error:', error);
    res.status(500).json({ message: 'Server error while fetching lawyers' });
  }
});

// @route   GET /api/contacts/psychologists
// @desc    Get list of psychologists
// @access  Private
router.get('/psychologists', auth, async (req, res) => {
  try {
    const { city, state, page = 1, limit = 10 } = req.query;
    
    const query = { 
      type: 'psychologist',
      isActive: true
    };
    
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const psychologists = await ServiceProvider.find(query)
      .sort({ 'ratings.averageRating': -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select('name contact address specialization ratings');

    const total = await ServiceProvider.countDocuments(query);

    res.json({
      psychologists,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total
      }
    });

  } catch (error) {
    console.error('Get psychologists error:', error);
    res.status(500).json({ message: 'Server error while fetching psychologists' });
  }
});

// @route   GET /api/contacts/emergency
// @desc    Get emergency contacts (police, hospitals)
// @access  Private
router.get('/emergency', auth, async (req, res) => {
  try {
    const { city, state, type } = req.query;
    
    const query = { 
      type: { $in: ['police_station', 'hospital'] },
      isActive: true
    };
    
    if (type) query.type = type;
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');

    const emergencyContacts = await ServiceProvider.find(query)
      .select('name contact address type isEmergency')
      .sort({ type: 1, name: 1 });

    res.json({ emergencyContacts });

  } catch (error) {
    console.error('Get emergency contacts error:', error);
    res.status(500).json({ message: 'Server error while fetching emergency contacts' });
  }
});

module.exports = router;