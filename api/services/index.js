const dbConnect = require('../_lib/dbConnect');
const ServiceProvider = require('../_lib/models/ServiceProvider');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await dbConnect();

    switch (req.method) {
      case 'GET':
        return await getServices(req, res);
      case 'POST':
        return await createService(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

async function getServices(req, res) {
  try {
    const { category, location } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const services = await ServiceProvider.find(query).sort({ rating: -1 });
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch services' });
  }
}

async function createService(req, res) {
  try {
    const service = new ServiceProvider(req.body);
    await service.save();
    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create service', error: error.message });
  }
}