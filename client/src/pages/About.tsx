import React from 'react';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  EyeIcon, 
  CpuChipIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  GlobeAltIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'AI-Powered Trust Scoring',
      description: 'Advanced machine learning algorithms analyze transaction patterns, compliance metrics, and community feedback to generate real-time trust scores for every organization.'
    },
    {
      icon: EyeIcon,
      title: 'End-to-End Transparency',
      description: 'Track every rupee from its source to the final beneficiary through immutable blockchain records, ensuring complete accountability in fund utilization.'
    },
    {
      icon: CpuChipIcon,
      title: 'Zero-Knowledge Privacy',
      description: 'Protect sensitive beneficiary information while maintaining full transparency using cutting-edge cryptographic proofs and privacy-preserving technologies.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Auditing',
      description: 'Gamified verification system where citizens can submit geo-tagged evidence, report issues, and earn rewards for ensuring organizational accountability.'
    },
    {
      icon: CurrencyRupeeIcon,
      title: 'Real-Time Fund Tracking',
      description: 'Monitor fund movements, disbursements, and expenditures in real-time with detailed breakdowns and automated alerts for suspicious activities.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Stakeholder Platform',
      description: 'Unified platform serving NGOs, government agencies, corporates, and citizens with role-specific dashboards and tailored transparency tools.'
    }
  ];

  const problemStatements = [
    {
      stat: '₹8-16B',
      description: 'Annual NGO funding misused in India'
    },
    {
      stat: '66.7%',
      description: 'Households report corruption in welfare schemes'
    },
    {
      stat: '45%',
      description: 'Decline in public trust in charitable organizations'
    },
    {
      stat: '₹2.5L Cr',
      description: 'Annual CSR spending lacks transparency'
    }
  ];

  const technologyStack = [
    { name: 'Blockchain', description: 'Immutable transaction records' },
    { name: 'AI/ML', description: 'Trust scoring and anomaly detection' },
    { name: 'Zero-Knowledge Proofs', description: 'Privacy-preserving verification' },
    { name: 'Smart Contracts', description: 'Automated fund disbursement' },
    { name: 'IoT Integration', description: 'Real-time project monitoring' },
    { name: 'Mobile Apps', description: 'Citizen engagement tools' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-trust-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">
              About <span className="text-primary-600">FundFlow</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto">
              We're building India's first comprehensive transparency platform that uses blockchain, 
              AI, and zero-knowledge proofs to restore trust in NGOs and public welfare systems.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <LightBulbIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
              <p className="text-neutral-600 leading-relaxed">
                To create a transparent, accountable ecosystem where every rupee donated or allocated 
                for social good can be tracked, every impact can be measured, and trust between 
                organizations and citizens is rebuilt through technology and community engagement.
              </p>
            </div>
            <div>
              <div className="bg-trust-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <EyeIcon className="h-8 w-8 text-trust-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Vision</h2>
              <p className="text-neutral-600 leading-relaxed">
                A future where corruption in NGOs and welfare schemes is eliminated through 
                radical transparency, where donors have complete confidence in their contributions, 
                and where every citizen can verify the impact of social programs in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              The Problem We're Solving
            </h2>
            <p className="text-xl text-neutral-600">
              India faces a massive trust deficit in its social sector
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {problemStatements.map((problem, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {problem.stat}
                </div>
                <div className="text-neutral-700 text-sm">
                  {problem.description}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Challenges:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Lack of real-time fund tracking systems</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Limited community oversight mechanisms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Complex bureaucratic processes</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Inadequate impact measurement tools</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Fragmented data across multiple platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-700">Low citizen awareness and engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How FundFlow Solves These Problems
            </h2>
            <p className="text-xl text-neutral-600">
              A comprehensive technology platform that brings transparency, accountability, and trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Powered by Cutting-Edge Technology
            </h2>
            <p className="text-xl text-neutral-600">
              We leverage the latest advancements in blockchain, AI, and privacy technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-neutral-900 mb-2">{tech.name}</h3>
                <p className="text-sm text-neutral-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-neutral-600">
              Building trust and transparency across India's social sector
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">2,800+</div>
              <div className="text-neutral-700">Organizations Onboarded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-trust-600 mb-2">₹85.6B</div>
              <div className="text-neutral-700">Funds Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-700 mb-2">12,450</div>
              <div className="text-neutral-700">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">76%</div>
              <div className="text-neutral-700">Average Trust Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Next?</h2>
            <p className="text-xl text-primary-100">
              Our roadmap for scaling transparency across India and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Q1 2025</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• Mobile app launch</li>
                <li>• Government integration</li>
                <li>• Advanced AI features</li>
              </ul>
            </div>
            <div className="bg-primary-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Q2-Q3 2025</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• International expansion</li>
                <li>• API marketplace</li>
                <li>• Enhanced privacy features</li>
              </ul>
            </div>
            <div className="bg-primary-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Q4 2025</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• Global compliance tools</li>
                <li>• Advanced analytics</li>
                <li>• Community governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Join the Transparency Revolution
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Whether you're an NGO, government agency, corporate, or citizen, you can be part of building a more transparent future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Get Started Today
            </button>
            <button className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
