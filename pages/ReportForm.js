import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import LegalInformation from '../components/LegalInformation';

const ReportForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    incidentDate: '',
    location: {
      address: '',
      city: '',
      state: '',
      pinCode: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [error, setError] = useState(null);

  const categories = [
    { value: 'cybercrime', label: 'Cybercrime (Online Fraud, Hacking, Identity Theft)' },
    { value: 'theft', label: 'Theft (Physical Property Theft)' },
    { value: 'fraud', label: 'Fraud (Financial/Document Fraud)' },
    { value: 'domestic_violence', label: 'Domestic Violence' },
    { value: 'assault', label: 'Assault/Physical Violence' },
    { value: 'rape', label: 'Sexual Offences' },
    { value: 'harassment', label: 'Harassment/Stalking' },
    { value: 'property', label: 'Property Disputes/Trespassing' },
    { value: 'discrimination', label: 'Discrimination (Caste/Gender/Religion)' },
    { value: 'financial', label: 'Financial Crimes/Money Laundering' },
    { value: 'civil', label: 'Civil Disputes' },
    { value: 'medical_emergency', label: 'Medical Emergency' },
    { value: 'mental_health', label: 'Mental Health Crisis' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSubmissionResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || '/api'}/reports`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSubmissionResult(response.data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('legal-analysis')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
      
    } catch (err) {
      console.error('Error submitting report:', err);
      setError(
        err.response?.data?.message || 
        'Error submitting report. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Create New Report</h1>
            </div>
            <p className="mt-2 text-gray-600">
              Provide detailed information about the incident. Our system will analyze your report and connect you with appropriate services.
            </p>
          </div>

          {/* Emergency Warning */}
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">
                <strong>If you're in immediate danger, call 100 (Police) or 112 (Universal Emergency) first.</strong> This form is for documenting incidents and getting legal assistance.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the incident"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Date *
                </label>
                <input
                  type="datetime-local"
                  id="incidentDate"
                  name="incidentDate"
                  required
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide as much detail as possible about what happened, including who was involved, what occurred, and any other relevant information..."
              />
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="location.address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label htmlFor="location.state" className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="location.state"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State (e.g., Delhi, Maharashtra)"
                  />
                </div>
                
                <div>
                  <label htmlFor="location.pinCode" className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    id="location.pinCode"
                    name="location.pinCode"
                    value={formData.location.pinCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="PIN Code (6 digits)"
                    pattern="[0-9]{6}"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}
        
        {/* Success Display with Legal Information */}
        {submissionResult && (
          <div id="legal-analysis" className="mt-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-green-900">
                  Report Submitted Successfully!
                </h2>
              </div>
              <p className="text-green-800 mb-4">
                Your report has been analyzed and processed. Report ID: <strong>{submissionResult.report._id}</strong>
              </p>
              
              {/* Analysis Summary */}
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3">Analysis Summary:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Severity:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      submissionResult.analysis.severity === 'critical' 
                        ? 'bg-red-100 text-red-800'
                        : submissionResult.analysis.severity === 'high'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submissionResult.analysis.severity.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Urgency:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      submissionResult.analysis.urgency === 'emergency'
                        ? 'bg-red-100 text-red-800'
                        : submissionResult.analysis.urgency === 'urgent'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {submissionResult.analysis.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Legal Priority:</span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {submissionResult.analysis.legal_priority}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Services Required */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Services Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(submissionResult.analysis.services_required)
                    .filter(([_, required]) => required)
                    .map(([service, _]) => (
                      <span key={service} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {service.replace('_', ' ').toUpperCase()}
                      </span>
                    ))
                  }
                </div>
              </div>
              
              {/* Recommendations */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Immediate Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {submissionResult.analysis.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Legal Information Component */}
            <LegalInformation 
              legalAnalysis={submissionResult.analysis.applicable_laws}
              legalPriority={submissionResult.analysis.legal_priority}
              treatmentEquality={submissionResult.analysis.treatment_equality}
              legalNotice={submissionResult.legal_notice}
            />
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/reports')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                View All My Reports
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Find Legal Services
              </button>
              <button
                onClick={() => {
                  setSubmissionResult(null);
                  setFormData({
                    title: '',
                    description: '',
                    category: '',
                    incidentDate: '',
                    location: { address: '', city: '', state: '', pinCode: '' }
                  });
                }}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportForm;