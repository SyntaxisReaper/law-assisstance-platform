const dbConnect = require('../_lib/dbConnect');
const Report = require('../_lib/models/Report');
const auth = require('../_lib/middleware/auth');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await dbConnect();

    switch (req.method) {
      case 'GET':
        return await getReports(req, res);
      case 'POST':
        return await createReport(req, res);
      case 'PUT':
        return await updateReport(req, res);
      case 'DELETE':
        return await deleteReport(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

async function getReports(req, res) {
  try {
    const authResult = await auth(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const reports = await Report.find({ userId: authResult.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch reports' });
  }
}

async function createReport(req, res) {
  try {
    const authResult = await auth(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const reportData = {
      ...req.body,
      userId: authResult.user.id
    };

    const report = new Report(reportData);
    await report.save();

    return res.status(201).json(report);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create report', error: error.message });
  }
}

async function updateReport(req, res) {
  try {
    const authResult = await auth(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const { id } = req.query;
    const report = await Report.findOneAndUpdate(
      { _id: id, userId: authResult.user.id },
      req.body,
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json(report);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update report' });
  }
}

async function deleteReport(req, res) {
  try {
    const authResult = await auth(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const { id } = req.query;
    const report = await Report.findOneAndDelete({ _id: id, userId: authResult.user.id });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to delete report' });
  }
}