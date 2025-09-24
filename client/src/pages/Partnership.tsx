import React, { useState } from 'react';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Partnership: React.FC = () => {
  const [selectedPartnershipType, setSelectedPartnershipType] = useState<string>('');

  const partnershipTypes = [
    {
      id: 'ngo',
      title: 'NGO Partnership',
      description: 'Join our transparency network as a verified NGO',
      icon: UserGroupIcon,
      benefits: [
        'Enhanced trust score visibility',
        'Blockchain-verified transactions',
        'AI-powered fund tracking',
        'Community engagement tools',
        'Donor confidence building'
      ]
    },
    {
      id: 'government',
      title: 'Government Collaboration',
      description: 'Partner with us for public welfare scheme transparency',
      icon: BuildingOfficeIcon,
      benefits: [
        'Real-time fund disbursement tracking',
        'Citizen feedback integration',
        'Corruption reduction tools',
        'Data analytics dashboard',
        'Public accountability reports'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Partnership',
      description: 'Enable transparent CSR and social impact investments',
      icon: CurrencyRupeeIcon,
      benefits: [
        'CSR fund tracking & reporting',
        'Impact measurement tools',
        'ESG compliance support',
        'Stakeholder transparency',
        'Brand trust enhancement'
      ]
    },
    {
      id: 'technology',
      title: 'Technology Integration',
      description: 'Integrate our APIs for transparency solutions',
      icon: ChartBarIcon,
      benefits: [
        'REST API access',
        'Blockchain integration',
        'AI trust scoring',
        'Zero-knowledge privacy',
        'Custom dashboard solutions'
      ]
    }
  ];

  const handlePartnershipForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your interest! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-trust-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">
              Partner With <span className="text-primary-600">FundFlow</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Join us in building a transparent ecosystem where every rupee can be tracked, 
              every impact can be measured, and trust is rebuilt through technology.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {partnershipTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <div 
                  key={type.id}
                  className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transition-all hover:shadow-xl border-2 ${
                    selectedPartnershipType === type.id 
                      ? 'border-primary-500 ring-2 ring-primary-200' 
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedPartnershipType(type.id)}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary-100 rounded-full p-3">
                      <IconComponent className="h-8 w-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-neutral-600">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-neutral-900">Key Benefits:</h4>
                    {type.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-trust-600 flex-shrink-0" />
                        <span className="text-neutral-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-neutral-600">
              Fill out the form below and our team will reach out to discuss your partnership needs.
            </p>
          </div>

          <form onSubmit={handlePartnershipForm} className="bg-neutral-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your organization name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="contact@organization.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Partnership Type *
                </label>
                <select
                  required
                  value={selectedPartnershipType}
                  onChange={(e) => setSelectedPartnershipType(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select partnership type</option>
                  {partnershipTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tell us about your organization and goals
                </label>
                <textarea
                  rows={5}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your organization, current projects, and how you'd like to partner with FundFlow..."
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Submit Partnership Request</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Organizations Choose FundFlow
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-neutral-700">Increase in donor trust</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-trust-600 mb-2">₹50Cr+</div>
              <div className="text-neutral-700">Funds tracked transparently</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-neutral-700 mb-2">2800+</div>
              <div className="text-neutral-700">Partner organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Our partnership team is ready to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Schedule a Call
            </button>
            <button className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-primary-400">
              Download Partnership Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
