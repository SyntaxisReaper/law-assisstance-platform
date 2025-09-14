const express = require('express');
const { auth } = require('../middleware/auth');
const { notifyEmergencyServices } = require('../utils/emergencyNotifier');
const ServiceProvider = require('../models/ServiceProvider');

const router = express.Router();

// @route   POST /api/emergency/alert
// @desc    Send immediate emergency alert
// @access  Private
router.post('/alert', auth, async (req, res) => {
  try {
    const { 
      emergency_type, 
      location, 
      description, 
      severity = 'critical',
      contact_preferences = ['sms', 'call']
    } = req.body;

    if (!emergency_type || !description) {
      return res.status(400).json({ 
        message: 'Emergency type and description are required' 
      });
    }

    // Create emergency notification object
    const emergencyAlert = {
      user: req.user._id,
      type: emergency_type,
      location,
      description,
      severity,
      urgency: 'emergency',
      timestamp: new Date(),
      services_required: determineEmergencyServices(emergency_type)
    };

    // Find and notify appropriate emergency services
    const notifications = await notifyEmergencyServices(emergencyAlert);

    // Log the emergency alert
    console.log(`🚨 EMERGENCY ALERT from user ${req.user._id}:`, emergencyAlert);

    res.status(200).json({
      message: 'Emergency alert sent successfully',
      alert_id: `EMG-${Date.now()}`,
      services_notified: notifications.length,
      notifications,
      next_steps: getEmergencyNextSteps(emergency_type)
    });

  } catch (error) {
    console.error('Emergency alert error:', error);
    res.status(500).json({ 
      message: 'Failed to send emergency alert',
      error: error.message 
    });
  }
});

// @route   GET /api/emergency/numbers
// @desc    Get emergency contact numbers
// @access  Private
router.get('/numbers', auth, async (req, res) => {
  try {
    const { state, city } = req.query;

    const emergencyNumbers = {
      national: {
        police: '911',
        fire: '911',
        medical: '911',
        poison_control: '1-800-222-1222',
        suicide_hotline: '988',
        domestic_violence: '1-800-799-7233'
      },
      local: []
    };

    // Get local emergency services
    const query = {
      type: { $in: ['police_station', 'hospital', 'mental_health_center'] },
      isActive: true,
      $or: [
        { isEmergency: true },
        { 'availability.emergency': true }
      ]
    };

    if (city) query['address.city'] = new RegExp(city, 'i');
    if (state) query['address.state'] = new RegExp(state, 'i');

    const localServices = await ServiceProvider.find(query)
      .select('name type contact address')
      .limit(20);

    emergencyNumbers.local = localServices.map(service => ({
      name: service.name,
      type: service.type,
      phone: service.contact.phone,
      emergency_phone: service.contact.emergencyPhone,
      address: service.address
    }));

    res.json(emergencyNumbers);

  } catch (error) {
    console.error('Get emergency numbers error:', error);
    res.status(500).json({ message: 'Server error while fetching emergency numbers' });
  }
});

// Helper function to determine required emergency services
function determineEmergencyServices(emergency_type) {
  const services = {
    police: false,
    medical: false,
    mental_health: false,
    fire: false,
    social_services: false
  };

  switch (emergency_type) {
    case 'medical':
      services.medical = true;
      break;
    case 'crime':
    case 'violence':
    case 'threat':
      services.police = true;
      services.medical = true; // May need medical attention
      break;
    case 'mental_health':
    case 'suicide':
      services.mental_health = true;
      services.medical = true;
      break;
    case 'domestic_violence':
      services.police = true;
      services.medical = true;
      services.mental_health = true;
      services.social_services = true;
      break;
    case 'fire':
      services.fire = true;
      services.medical = true;
      break;
    default:
      services.police = true;
      services.medical = true;
  }

  return services;
}

// Helper function to provide next steps for different emergency types
function getEmergencyNextSteps(emergency_type) {
  const nextSteps = {
    immediate: [],
    followup: []
  };

  switch (emergency_type) {
    case 'medical':
      nextSteps.immediate = [
        'Call 911 if not already done',
        'Stay calm and follow dispatcher instructions',
        'If possible, have someone meet the ambulance'
      ];
      nextSteps.followup = [
        'Contact your doctor',
        'Inform family members',
        'Follow up with medical records'
      ];
      break;
    case 'crime':
    case 'violence':
      nextSteps.immediate = [
        'Ensure your immediate safety',
        'Call 911 if in immediate danger',
        'Do not touch or move evidence'
      ];
      nextSteps.followup = [
        'File a police report',
        'Document everything',
        'Consider legal consultation'
      ];
      break;
    case 'mental_health':
    case 'suicide':
      nextSteps.immediate = [
        'Call 988 (Suicide & Crisis Lifeline)',
        'Stay with the person if safe to do so',
        'Remove any means of self-harm'
      ];
      nextSteps.followup = [
        'Schedule mental health appointment',
        'Create safety plan',
        'Involve support network'
      ];
      break;
    default:
      nextSteps.immediate = [
        'Ensure your safety first',
        'Call appropriate emergency number',
        'Follow emergency responder instructions'
      ];
      nextSteps.followup = [
        'Document the incident',
        'Seek appropriate professional help',
        'Follow up as needed'
      ];
  }

  return nextSteps;
}

module.exports = router;