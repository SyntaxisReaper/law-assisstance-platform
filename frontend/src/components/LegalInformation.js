import React from 'react';
import { Scale, AlertCircle, BookOpen, Shield } from 'lucide-react';

const LegalInformation = ({ legalAnalysis, legalPriority, treatmentEquality, legalNotice }) => {
  if (!legalAnalysis || legalAnalysis.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
      <div className="flex items-center mb-4">
        <Scale className="h-6 w-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">
          Applicable Indian Laws & Legal Framework
        </h3>
      </div>

      {/* Legal Priority Notice */}
      {legalPriority && (
        <div className="bg-green-100 border border-green-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              Legal Priority: {legalPriority}
            </span>
          </div>
        </div>
      )}

      {/* Equal Treatment Notice */}
      {treatmentEquality && (
        <div className="bg-indigo-100 border border-indigo-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-indigo-800 text-sm">
              {treatmentEquality}
            </span>
          </div>
        </div>
      )}

      {/* Legal Notice */}
      {legalNotice && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div className="flex items-start">
            <BookOpen className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <span className="text-yellow-800 text-sm">
              <strong>Important:</strong> {legalNotice}
            </span>
          </div>
        </div>
      )}

      {/* Legal Acts and Sections */}
      <div className="space-y-6">
        {legalAnalysis.map((lawGroup, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-gray-900">
                {lawGroup.act}
              </h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lawGroup.priority === 'HIGH' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {lawGroup.type} - {lawGroup.priority} Priority
              </span>
            </div>

            {/* Special Note */}
            {lawGroup.note && (
              <div className="bg-gray-50 rounded-md p-3 mb-4">
                <p className="text-sm text-gray-700 italic">
                  <strong>Note:</strong> {lawGroup.note}
                </p>
              </div>
            )}

            {/* Sections */}
            {lawGroup.sections && lawGroup.sections.length > 0 && (
              <div className="space-y-3">
                {lawGroup.sections.map((section, sIndex) => (
                  <div key={sIndex} className="border-l-4 border-blue-400 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">
                          {section.section}
                          {section.title && `: ${section.title}`}
                        </h5>
                        {section.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {section.description}
                          </p>
                        )}
                        {section.penalty && (
                          <p className="text-sm text-red-600 mt-2 font-medium">
                            <strong>Penalty:</strong> {section.penalty}
                          </p>
                        )}
                      </div>
                      {section.applicable && (
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Applicable
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legal Action Steps */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Next Legal Steps:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Contact Legal Aid Services at <strong>15100</strong> for free legal consultation
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            File appropriate complaint with relevant authorities
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Preserve all evidence and documentation
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Seek support from relevant organizations and services
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> This information is for guidance purposes only. 
          Please consult with qualified legal professionals for specific legal advice. 
          Laws and penalties may vary based on specific circumstances and jurisdictions.
        </p>
      </div>
    </div>
  );
};

export default LegalInformation;