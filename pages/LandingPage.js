import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Phone, Users, AlertTriangle, Clock, CheckCircle, Star } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Report Analysis',
      description: 'AI-powered analysis of your incident reports to determine urgency and required services automatically.'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Response',
      description: 'Instant notification to police, medical, and mental health services when critical situations are detected.'
    },
    {
      icon: Users,
      title: 'Service Directory',
      description: 'Access to verified lawyers, psychologists, and emergency contacts in your area.'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Submit reports and get help anytime, with emergency services available around the clock.'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your reports and personal information are protected with enterprise-grade security.'
    },
    {
      icon: CheckCircle,
      title: 'Track Progress',
      description: 'Monitor the status of your reports and get updates from assigned service providers.'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Create Your Report',
      description: 'Describe your incident in detail. Our system will analyze and categorize it automatically.'
    },
    {
      number: 2,
      title: 'Automatic Service Detection',
      description: 'We determine what help you need - police, medical, legal, or mental health support.'
    },
    {
      number: 3,
      title: 'Instant Notifications',
      description: 'Relevant services are notified immediately, especially for emergency situations.'
    },
    {
      number: 4,
      title: 'Get Connected',
      description: 'Access contact information and get connected with the right professionals.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              भारत में सहायता - Get Help When You Need It Most
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Report incidents, connect with Indian emergency services, and access legal support 
              through our intelligent assistance platform designed for India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Get Started Now
              </Link>
              <Link
                to="/emergency"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform uses advanced technology to ensure you get the right help quickly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting help is simple with our streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Services Section */}
      <div className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-600 text-white p-8 rounded-lg">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              In an Emergency?
            </h2>
            <p className="text-xl mb-6">
              If you're in immediate danger, call 100 (Police) or 112 (Universal Emergency) first. Then use our platform to ensure proper follow-up care and documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:100"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call 100 (Police) Now
              </a>
              <a
                href="tel:112"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Call 112 (Emergency) Now
              </a>
              <Link
                to="/register"
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Create Account for Follow-up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust our platform for emergency assistance and legal support.
          </p>
          <Link
            to="/register"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
          >
            Create Your Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;