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

  // Emergency contacts data
  const emergencyContacts = [
    { name: 'Police', number: '100', type: 'emergency' },
    { name: 'Fire Department', number: '101', type: 'emergency' },
    { name: 'Ambulance', number: '102', type: 'emergency' },
    { name: 'Women Helpline', number: '1091', type: 'support' },
    { name: 'Child Helpline', number: '1098', type: 'support' },
    { name: 'National Legal Services Authority', number: '15100', type: 'legal' },
    { name: 'Supreme Court Legal Aid', number: '011-23388922', type: 'legal' }
  ];

  return res.status(200).json(emergencyContacts);
};