const jwt = require('jsonwebtoken');
const dbConnect = require('../_lib/dbConnect');
const User = require('../_lib/models/User');

// Auth middleware
const authenticate = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  const user = await User.findById(decoded.id).select('-password');
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await dbConnect();

    // Authenticate user
    const user = await authenticate(req);

    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        emergencyContact: user.emergencyContact,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.message === 'No token provided' || error.message === 'User not found') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};