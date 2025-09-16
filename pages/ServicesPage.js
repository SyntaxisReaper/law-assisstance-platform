import React from 'react';
import { Users, Phone, MapPin } from 'lucide-react';

const ServicesPage = () => {
  const serviceTypes = [
    {
      title: 'Lawyers',
      description: 'Legal professionals for various legal matters',
      icon: Users,
      color: 'bg-blue-600'
    },
    {
      title: 'Psychologists',
      description: 'Mental health professionals and therapists',
      icon: Users,
      color: 'bg-green-600'
    },
    {
      title: 'Emergency Services',
      description: 'Police stations and emergency contacts',
      icon: Phone,
      color: 'bg-red-600'
    },
    {
      title: 'Medical Centers',
      description: 'Hospitals and medical facilities',
      icon: MapPin,
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Services Directory</h1>
          </div>
          <p className="text-gray-600">
            Find and connect with verified service providers in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {serviceTypes.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Legal Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 text-blue-600 mr-3" />
            Legal Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Legal Aid Services</h3>
              <p className="text-gray-600 text-sm mb-2">Free legal aid for underprivileged</p>
              <p className="text-blue-600 font-medium">Call: 15100</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Delhi High Court</h3>
              <p className="text-gray-600 text-sm mb-2">Supreme Court of India</p>
              <p className="text-blue-600 font-medium">Delhi, India</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Women Legal Aid</h3>
              <p className="text-gray-600 text-sm mb-2">Specialized legal support for women</p>
              <p className="text-blue-600 font-medium">Call: 181</p>
            </div>
          </div>
        </div>

        {/* Mental Health Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 text-green-600 mr-3" />
            Mental Health Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">COOJ Mental Health</h3>
              <p className="text-gray-600 text-sm mb-2">24/7 Mental health support</p>
              <p className="text-green-600 font-medium">Call: +91 9152987821</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Vandrevala Foundation</h3>
              <p className="text-gray-600 text-sm mb-2">Crisis intervention & support</p>
              <p className="text-green-600 font-medium">Call: +91 9999666760</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">NIMHANS</h3>
              <p className="text-gray-600 text-sm mb-2">National Institute of Mental Health</p>
              <p className="text-green-600 font-medium">Bangalore, Karnataka</p>
            </div>
          </div>
        </div>

        {/* Women Support Organizations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 text-purple-600 mr-3" />
            Women Support Organizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Women's Helpline</h3>
              <p className="text-gray-600 text-sm mb-2">24x7 support for women in distress</p>
              <p className="text-purple-600 font-medium">Call: 181</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">One Stop Centre</h3>
              <p className="text-gray-600 text-sm mb-2">Integrated support for women</p>
              <p className="text-purple-600 font-medium">Multiple locations</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Nirbhaya SOS</h3>
              <p className="text-gray-600 text-sm mb-2">Emergency app for women safety</p>
              <p className="text-purple-600 font-medium">Mobile App Available</p>
            </div>
          </div>
        </div>

        {/* Legal Framework Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Indian Laws</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Women Protection Acts</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Domestic Violence Act, 2005</li>
                <li>• Sexual Harassment Act, 2013</li>
                <li>• Dowry Prohibition Act, 1961</li>
                <li>• Immoral Traffic Prevention Act</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Criminal Law Sections</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• IPC Section 375-376: Rape</li>
                <li>• IPC Section 354: Assault on women</li>
                <li>• IPC Section 498A: Dowry harassment</li>
                <li>• IPC Section 509: Insulting modesty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;