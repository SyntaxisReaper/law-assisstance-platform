const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getApplicableLaws } = require('./data/indianLaws');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// In-memory storage for testing (replace with MongoDB in production)
let users = [];
let reports = [];
let serviceProviders = [
  {
    _id: '1',
    name: 'Delhi Police Station - Connaught Place',
    type: 'police_station',
    contact: { phone: '011-23362123', emergencyPhone: '100' },
    address: { street: 'Connaught Place', city: 'New Delhi', state: 'Delhi', pinCode: '110001' },
    isEmergency: true,
    isActive: true
  },
  {
    _id: '2',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    type: 'hospital',
    contact: { phone: '011-26588500', emergencyPhone: '102' },
    address: { street: 'Sri Aurobindo Marg', city: 'New Delhi', state: 'Delhi', pinCode: '110029' },
    specialization: ['emergency_medicine', 'trauma_care'],
    isEmergency: true,
    isActive: true
  },
  {
    _id: '3',
    name: 'Dr. Rashmi Sharma, Clinical Psychologist',
    type: 'psychologist',
    contact: { phone: '+91-9876543210', email: 'dr.sharma@mindwellness.in' },
    address: { street: 'Defence Colony', city: 'New Delhi', state: 'Delhi', pinCode: '110024' },
    specialization: ['trauma', 'mental_health', 'women_counseling'],
    isActive: true
  },
  {
    _id: '4',
    name: 'Legal Aid Services Delhi',
    type: 'legal_aid',
    contact: { phone: '15100', email: 'legalaid@delhi.gov.in' },
    address: { street: 'High Court Complex', city: 'New Delhi', state: 'Delhi', pinCode: '110003' },
    specialization: ['women_rights', 'criminal_law', 'domestic_violence'],
    isActive: true
  },
  {
    _id: '5',
    name: 'One Stop Centre - Women Support',
    type: 'women_support',
    contact: { phone: '181', emergencyPhone: '181' },
    address: { street: 'Various Locations', city: 'New Delhi', state: 'Delhi', pinCode: '110001' },
    specialization: ['domestic_violence', 'women_safety', 'legal_aid'],
    isEmergency: true,
    isActive: true
  }
];

const JWT_SECRET = 'test-secret-key';

// Helper functions
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
};

const analyzeReport = (description, category) => {
  const emergencyKeywords = ['emergency', 'urgent', 'bleeding', 'unconscious', 'assault', 'violence', 'rape', 'मदद', 'बचाओ'];
  const medicalKeywords = ['injured', 'hurt', 'pain', 'bleeding', 'medical', 'घायल', 'दर्द'];
  const mentalHealthKeywords = ['depressed', 'suicidal', 'anxiety', 'panic', 'अवसाद', 'तनाव'];
  const cybercrimeKeywords = ['online', 'internet', 'cyber', 'hacking', 'phishing', 'digital', 'website', 'app', 'social media'];
  
  const text = description.toLowerCase();
  
  // EQUAL IMPORTANCE: All crimes get HIGH priority for legal analysis
  let severity = 'high'; // Default high importance for all crimes
  let urgency = 'urgent'; // All crimes are urgent for legal purposes
  
  const services_required = {
    police: false,
    medical: false,
    mental_health: false,
    legal: true, // Legal support required for ALL crimes equally
    women_support: false
  };
  
  const recommendations = [
    'Your complaint will be treated with equal seriousness regardless of crime type',
    'Contact Legal Aid Services at 15100 for free consultation',
    'Document all evidence and keep records safe'
  ];
  
  // Get comprehensive legal analysis using the database
  const detailedLegalAnalysis = getApplicableLaws(category, description, severity);
  
  // Analyze based on keywords and category with equal treatment
  const hasEmergency = emergencyKeywords.some(k => text.includes(k));
  
  if (hasEmergency) {
    severity = 'critical';
    urgency = 'emergency';
    recommendations.unshift('Call appropriate emergency services immediately');
  }
  
  // Cybercrime gets EQUAL treatment as physical crimes
  if (category === 'cybercrime' || cybercrimeKeywords.some(k => text.includes(k))) {
    services_required.police = true;
    recommendations.push('File cyber crime complaint at www.cybercrime.gov.in');
    recommendations.push('Contact Cyber Crime Cell at your local police station');
    recommendations.push('Preserve all digital evidence (screenshots, emails, messages)');
  }
  
  // Physical crimes
  if (['assault', 'domestic_violence', 'theft', 'rape', 'robbery'].includes(category)) {
    services_required.police = true;
    recommendations.push('Call 100 (Police) immediately');
    recommendations.push('File FIR at nearest police station');
    
    if (category === 'domestic_violence') {
      services_required.women_support = true;
      recommendations.push('Contact Women Helpline at 181');
    }
  }
  
  // Medical support
  if (medicalKeywords.some(k => text.includes(k)) || category === 'medical_emergency') {
    services_required.medical = true;
    recommendations.push('Call 102 (Ambulance) for medical emergency');
    recommendations.push('Seek immediate medical attention and preserve medical records');
  }
  
  // Mental health support
  if (mentalHealthKeywords.some(k => text.includes(k)) || category === 'mental_health') {
    services_required.mental_health = true;
    recommendations.push('Contact COOJ Mental Health Support: +91 9152987821');
    recommendations.push('Vandrevala Foundation Crisis Support: +91 9999666760');
  }
  
  // Financial crimes get equal treatment
  if (['fraud', 'financial', 'cheating'].includes(category)) {
    services_required.police = true;
    recommendations.push('Report to Economic Offences Wing');
    recommendations.push('Contact bank/financial institution immediately');
    recommendations.push('Preserve all transaction records and communications');
  }
  
  // Property crimes
  if (category === 'property') {
    services_required.police = true;
    recommendations.push('File complaint with local police');
    recommendations.push('Gather all property documents and evidence');
  }
  
  // Women-specific support
  if (text.includes('woman') || text.includes('wife') || text.includes('female')) {
    services_required.women_support = true;
    recommendations.push('Women-specific legal protections available');
    recommendations.push('Contact One Stop Centre for integrated support');
  }

  return { 
    severity, 
    urgency, 
    services_required, 
    recommendations, 
    applicable_laws: detailedLegalAnalysis,
    legal_priority: 'HIGH', // All crimes get high legal priority
    treatment_equality: 'All crimes are treated with equal importance and legal seriousness'
  };
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    
    // Input validation
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    // Check if user exists
    if (users.find(u => u.email === email.toLowerCase())) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = {
      _id: String(users.length + 1),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role: 'user',
      createdAt: new Date()
    };
    
    users.push(user);
    
    // Generate token
    const token = generateToken(user._id);
    
    const { password: _, ...userResponse } = user;
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    const { password: _, ...userResponse } = user;
    
    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const { password: _, ...userResponse } = user;
    res.json({ user: userResponse });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Report Routes
app.post('/api/reports', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const reportData = { ...req.body, user: user._id };
    
    // Analyze the report
    const analysis = analyzeReport(reportData.description, reportData.category);
    reportData.severity = analysis.severity;
    reportData.urgency = analysis.urgency;
    reportData.services_required = analysis.services_required;
    
    const report = {
      _id: String(reports.length + 1),
      ...reportData,
      status: 'pending',
      createdAt: new Date(),
      priority_score: 0
    };
    
    reports.push(report);
    
    // Simulate emergency notification
    if (report.urgency === 'emergency') {
      console.log(`🚨 EMERGENCY NOTIFICATION: Report ${report._id} requires immediate attention!`);
    }
    
    res.status(201).json({
      message: 'Report created successfully',
      report,
      analysis: {
        severity: analysis.severity,
        urgency: analysis.urgency,
        services_required: analysis.services_required,
        recommendations: analysis.recommendations,
        applicable_laws: analysis.applicable_laws,
        legal_priority: analysis.legal_priority,
        treatment_equality: analysis.treatment_equality
      },
      legal_notice: 'All crimes are treated with equal legal importance. Whether cybercrime or physical crime, your case will receive full legal support and attention.'
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error while creating report' });
  }
});

app.get('/api/reports', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const userReports = reports.filter(r => r.user === decoded.id);
    
    res.json({
      reports: userReports,
      pagination: { current: 1, pages: 1, total: userReports.length }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
});

// Services Routes
app.get('/api/services', (req, res) => {
  res.json({
    services: serviceProviders,
    pagination: { current: 1, pages: 1, total: serviceProviders.length }
  });
});

app.get('/api/emergency/numbers', (req, res) => {
  const emergencyNumbers = {
    national: {
      police: '100',
      fire: '101',
      medical: '102',
      universal_emergency: '112',
      women_helpline: '181',
      child_helpline: '1098',
      legal_aid: '15100',
      tourist_emergency: '1363',
      mental_health: '+91 9152987821'
    },
    local: serviceProviders.filter(s => s.isEmergency).map(s => ({
      name: s.name,
      type: s.type,
      phone: s.contact.phone,
      emergency_phone: s.contact.emergencyPhone,
      address: s.address
    })),
    crisis_support: {
      cooj_mental_health: '+91 9152987821',
      vandrevala_foundation: '+91 9999666760',
      suicide_prevention: '+91 9820466726'
    }
  };
  
  res.json(emergencyNumbers);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Law Assistance Platform Test Server is running!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000; // Default to 5000 for consistency

app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`📊 In-memory database initialized with ${serviceProviders.length} service providers`);
  console.log(`🔧 This is a TEST server - data will not persist after restart`);
  console.log(`💡 For production, set up MongoDB and use the main server.js`);
  console.log(`🌐 Frontend should connect to: http://localhost:${PORT}/api`);
});
