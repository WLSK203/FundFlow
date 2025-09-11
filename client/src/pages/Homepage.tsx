import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, ChartBarIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Organization, DashboardStats } from '../types';
import TrustScoreDisplay from '../components/TrustScoreDisplay';
import FundTracker from '../components/FundTracker';
import SearchBar from '../components/SearchBar';

const Homepage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrganizations: 2840,
    totalProjects: 12450,
    totalFundsTracked: 85600000000, // $85.6 billion
    averageTrustScore: 76,
    activeAudits: 1200,
    resolvedIssues: 8900
  });

  const [featuredOrganizations, setFeaturedOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // This would normally fetch from API
    setFeaturedOrganizations([
      {
        id: '1',
        name: 'Akshaya Patra Foundation',
        registrationNumber: 'REG-2001-APF-001',
        type: 'NGO',
        trustScore: 94,
        trustTrend: [89, 91, 92, 94, 94],
        description: 'Largest NGO in India providing mid-day meals to school children',
        email: 'info@akshayapatra.org',
        phone: '+91-80-3021-4444',
        address: 'Bangalore, Karnataka',
        projects: [],
        totalFundsReceived: 450000000,
        totalFundsDisbursed: 420000000,
        verificationStatus: 'verified',
        createdAt: new Date('2001-06-15'),
        updatedAt: new Date('2024-12-11')
      },
      {
        id: '2',
        name: 'Ministry of Rural Development',
        registrationNumber: 'GOI-MRD-2014',
        type: 'Government',
        trustScore: 82,
        trustTrend: [78, 79, 80, 81, 82],
        description: 'Government ministry overseeing rural development schemes',
        email: 'info@rural.nic.in',
        phone: '+91-11-2338-2045',
        address: 'New Delhi',
        projects: [],
        totalFundsReceived: 1200000000,
        totalFundsDisbursed: 980000000,
        verificationStatus: 'verified',
        createdAt: new Date('2014-05-26'),
        updatedAt: new Date('2024-12-11')
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-trust-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6">
              Rebuilding Trust,
              <span className="text-primary-600"> One Rupee </span>
              at a Time
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              FundFlow brings radical transparency to NGOs, public welfare schemes, and digital financial services through blockchain technology, AI-powered trust scoring, and zero-knowledge proofs.
            </p>
            
            {/* Global Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <SearchBar 
                placeholder="Search for NGOs, projects, or welfare schemes..." 
                onSearch={(query) => console.log('Search:', query)}
              />
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-primary-600">
                  ₹{(stats.totalFundsTracked / 1000000000).toFixed(1)}B
                </div>
                <div className="text-sm text-neutral-600">Funds Tracked</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-trust-600">
                  {stats.totalOrganizations.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600">Organizations</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-primary-600">
                  {stats.totalProjects.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600">Active Projects</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-trust-600">
                  {stats.averageTrustScore}%
                </div>
                <div className="text-sm text-neutral-600">Avg Trust Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Impactful Statistics Banner */}
        <div className="bg-red-600 text-white py-4 px-4 rounded-lg max-w-4xl mx-auto mb-8">
          <div className="text-center">
            <p className="text-lg font-semibold">
              🚨 $8-16 billion in NGO funding misused annually in India
            </p>
            <p className="text-sm opacity-90">
              66.7% of households report corruption in public welfare schemes
            </p>
          </div>
        </div>
      </section>

      {/* Featured Organizations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Featured High-Trust Organizations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredOrganizations.map(org => (
              <div key={org.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{org.name}</h3>
                    <p className="text-sm text-neutral-600">{org.type} • {org.address}</p>
                  </div>
                  <TrustScoreDisplay score={org.trustScore} size="large" />
                </div>
                <p className="text-neutral-700 mb-4">{org.description}</p>
                <div className="flex items-center justify-between text-sm text-neutral-600">
                  <span>₹{(org.totalFundsReceived / 10000000).toFixed(1)}Cr raised</span>
                  <span className="flex items-center">
                    <ShieldCheckIcon className="h-4 w-4 mr-1" />
                    {org.verificationStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Fund Tracker Visualization */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Live Fund Movement Tracker
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <FundTracker />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Powered by Innovation
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">AI-Powered Trust Scores</h3>
              <p className="text-neutral-600">
                Real-time trust scoring using machine learning analysis of transaction patterns, community feedback, and compliance metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-trust-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="h-8 w-8 text-trust-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">End-to-End Transparency</h3>
              <p className="text-neutral-600">
                Track every rupee from source to beneficiary through immutable blockchain records with zero-knowledge privacy protection.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Community Auditing</h3>
              <p className="text-neutral-600">
                Gamified verification system where citizens can submit geo-tagged evidence and earn rewards for ensuring accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join us in rebuilding trust!</h2>
          <p className="text-xl mb-8 text-primary-100">
            Partner with us, invest in our vision, or help us scale transparency across India and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Partner With Us
            </button>
            <button className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border border-primary-400">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
