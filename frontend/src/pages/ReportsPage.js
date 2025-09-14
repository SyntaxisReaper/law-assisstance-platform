import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
            </div>
            <Link
              to="/report"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Link>
          </div>
          <p className="mt-2 text-gray-600">
            Track and manage all your submitted reports
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No reports yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't submitted any reports. Click the button below to create your first report.
          </p>
          <Link
            to="/report"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;