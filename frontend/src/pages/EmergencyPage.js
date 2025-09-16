import React from 'react';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

const EmergencyPage = () => {
  const emergencyContacts = [
    {
      name: 'Police',
      number: '100',
      description: 'Police Emergency Services',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'Fire Brigade',
      number: '101',
      description: 'Fire Emergency Services',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      name: 'Ambulance',
      number: '102',
      description: 'Medical Emergency Services',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Women Helpline',
      number: '181',
      description: 'Women in Distress Helpline',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      description: 'Child Emergency Services',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Tourist Emergency',
      number: '1363',
      description: 'Tourist Helpline Services',
      color: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      name: 'National Emergency',
      number: '112',
      description: 'Single Emergency Number for all Services',
      color: 'bg-red-800 hover:bg-red-900'
    },
    {
      name: 'Mental Health Helpline',
      number: '9152987821',
      description: 'COOJ Mental Health Support',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Warning */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold">Emergency Assistance</h1>
          </div>
          <p className="text-xl mb-4">
            If you are in immediate danger or experiencing any emergency, call 100 (Police) or 112 (Universal Emergency) now.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:100"
              className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold text-lg transition-colors inline-flex items-center"
            >
              <Phone className="h-6 w-6 mr-2" />
              CALL 100 (POLICE)
            </a>
            <a
              href="tel:112"
              className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold text-lg transition-colors inline-flex items-center"
            >
              <Phone className="h-6 w-6 mr-2" />
              CALL 112 (EMERGENCY)
            </a>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">{contact.description}</p>
                  <a
                    href={`tel:${contact.number}`}
                    className={`${contact.color} text-white px-4 py-2 rounded-md font-medium transition-colors w-full text-center block`}
                  >
                    {contact.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Safety Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <p className="text-gray-700">
                <strong>Stay calm</strong> and assess your situation
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <p className="text-gray-700">
                <strong>Call 100 (Police) or 112 (Universal Emergency)</strong> for immediate life-threatening emergencies
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <p className="text-gray-700">
                <strong>Provide your location</strong> clearly to emergency services
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <p className="text-gray-700">
                <strong>Follow dispatcher instructions</strong> exactly
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
              </div>
              <p className="text-gray-700">
                <strong>Document the incident</strong> using our platform after you're safe
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Crisis Services */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">WhatsApp Crisis Support</h3>
          </div>
          <p className="text-gray-700 mb-4">
            If you're experiencing a crisis but can't call, you can contact these WhatsApp services:
          </p>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-center text-lg">
                <strong>WhatsApp: +91 9152987821</strong>
              </p>
              <p className="text-center text-gray-600 mt-2">COOJ Mental Health Support</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-center text-lg">
                <strong>WhatsApp: +91 9999666760</strong>
              </p>
              <p className="text-center text-gray-600 mt-2">Vandrevala Foundation Crisis Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;