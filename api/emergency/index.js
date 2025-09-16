const dbConnect = require('../_lib/dbConnect');
const emergencyNotifier = require('../_lib/utils/emergencyNotifier');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { type, location, description, contact } = req.body;

    if (!type || !location || !contact) {
      return res.status(400).json({ 
        message: 'Missing required fields: type, location, contact' 
      });
    }

    // Process emergency notification
    const result = await emergencyNotifier.processEmergency({
      type,
      location,
      description,
      contact,
      timestamp: new Date()
    });

    return res.status(200).json({
      message: 'Emergency alert sent successfully',
      alertId: result.alertId,
      timestamp: result.timestamp
    });

  } catch (error) {
    console.error('Emergency API Error:', error);
    return res.status(500).json({ message: 'Failed to process emergency alert' });
  }
};