import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, AlertTriangle, Users, Plus, Phone } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'File New Report',
      description: 'Report an incident and get immediate assistance',
      icon: FileText,
      link: '/report',
      color: 'bg-blue-600 hover:bg-blue-700',
      urgent: false
    },
    {
      title: 'Emergency Alert',
      description: 'Immediate help for critical situations',
      icon: AlertTriangle,
      link: '/emergency',
      color: 'bg-red-600 hover:bg-red-700',
      urgent: true
    },
    {
      title: 'Find Services',
      description: 'Connect with lawyers, psychologists, and emergency services',
      icon: Users,
      link: '/services',
      color: 'bg-green-600 hover:bg-green-700',
      urgent: false
    }
  ];

  const emergencyNumbers = [
    { name: 'Emergency', number: '911', description: 'Police, Fire, Medical Emergency' },
    { name: 'Suicide Prevention', number: '988', description: 'Crisis & Suicide Lifeline' },
    { name: 'Domestic Violence', number: '1-800-799-7233', description: 'National Domestic Violence Hotline' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Get help when you need it most. Our platform is here to assist you 24/7.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-800">
                In an Emergency?
              </h3>
              <p className="text-red-700">
                If you're in immediate danger, call 911 first. Then use our platform for follow-up assistance.
              </p>
            </div>
            <div className="ml-4">
              <a
                href="tel:911"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Call 911
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white rounded-lg p-6 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform`}
              >
                <div className="flex items-center mb-4">
                  <action.icon className="h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold">{action.title}</h3>
                  {action.urgent && (
                    <span className="ml-2 bg-yellow-400 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-white/90">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Contact Numbers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Numbers</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {emergencyNumbers.map((contact, index) => (
              <div key={index} className={`p-4 ${index !== emergencyNumbers.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <a
                      href={`tel:${contact.number}`}
                      className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Reports</h2>
            <Link
              to="/reports"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Reports →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reports yet
            </h3>
            <p className="text-gray-600 mb-4">
              When you submit a report, you'll be able to track its progress here.
            </p>
            <Link
              to="/report"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;