import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Organization } from '../types';
import { getOrganizationById } from '../services/mockData';
import TrustScoreDisplay from '../components/TrustScoreDisplay';
import CommunityAudit from '../components/CommunityAudit';
import FundUsageTracker from '../components/FundUsageTracker';
import OrganizationFundTracker from '../components/OrganizationFundTracker';
import DonationModal from '../components/DonationModal';
import { 
  ArrowLeftIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'audits' | 'funding' | 'transparency'>('overview');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const org = await getOrganizationById(id);
        setOrganization(org);
      } catch (error) {
        console.error('Error fetching organization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const handleDonationComplete = (donationDetails: any) => {
    console.log('Donation completed:', donationDetails);
    // Here you would typically update the organization's fund data
    // and show a success message
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'NGO':
        return '❤️';
      case 'Government':
        return '🏛️';
      case 'Private':
        return '🏢';
      case 'Digital_Financial_Service':
        return '💳';
      case 'Public_Service':
        return '🛡️';
      default:
        return '🏢';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Organization not found</h2>
          <p className="text-neutral-600 mb-6">The organization you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/search')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">{getTypeIcon(organization.type)}</div>
                <h1 className="text-3xl font-bold text-neutral-900">{organization.name}</h1>
              </div>
              
              <div className="flex items-center space-x-3 mb-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  organization.type === 'NGO' ? 'bg-red-100 text-red-800' :
                  organization.type === 'Government' ? 'bg-blue-100 text-blue-800' :
                  organization.type === 'Private' ? 'bg-purple-100 text-purple-800' :
                  organization.type === 'Digital_Financial_Service' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {organization.type.replace('_', ' ')}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
                  {organization.category}
                </span>
                <span className="flex items-center text-sm text-neutral-600">
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  {organization.verificationStatus}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="flex items-center text-sm text-neutral-600">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {organization.address}
                </span>
                {organization.impact && (
                  <>
                    <span className="text-sm text-neutral-600">
                      🎯 Impact Score: <strong>{organization.impact.impactScore}/100</strong>
                    </span>
                    <span className="text-sm text-neutral-600">
                      👥 {organization.impact.beneficiariesReached.toLocaleString()} beneficiaries
                    </span>
                  </>
                )}
              </div>

              <p className="text-neutral-700 text-lg max-w-4xl mb-4">{organization.description}</p>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                {organization.donationEnabled && (
                  <button
                    onClick={() => setIsDonationModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  >
                    <span>❤️</span>
                    <span>Donate Now</span>
                  </button>
                )}
                {organization.website && (
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  >
                    <GlobeAltIcon className="h-4 w-4" />
                    <span>Visit Website</span>
                  </a>
                )}
                {organization.socialLinks && Object.keys(organization.socialLinks).length > 0 && (
                  <button className="border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-6 py-3 rounded-lg font-medium transition-colors">
                    Follow
                  </button>
                )}
              </div>
            </div>

            <div className="ml-8">
              <TrustScoreDisplay score={organization.trustScore} size="large" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'funding', label: 'Fund Tracking' },
              { id: 'transparency', label: 'Transparency' },
              { id: 'audits', label: 'Community Audits' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Statistics */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Key Statistics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-lg p-3 mr-4">
                      <CurrencyRupeeIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {formatCurrency(organization.totalFundsReceived)}
                      </div>
                      <div className="text-sm text-neutral-600">Total Funds Received</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-trust-100 rounded-lg p-3 mr-4">
                      <ChartBarIcon className="h-6 w-6 text-trust-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {formatCurrency(organization.totalFundsDisbursed)}
                      </div>
                      <div className="text-sm text-neutral-600">Funds Utilized</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                      <UserGroupIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {organization.impact ? organization.impact.beneficiariesReached.toLocaleString() : 'N/A'}
                      </div>
                      <div className="text-sm text-neutral-600">Beneficiaries Reached</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                      <ChartBarIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {organization.impact ? organization.impact.fundUtilizationRate.toFixed(1) : ((organization.totalFundsDisbursed / organization.totalFundsReceived) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-neutral-600">Fund Efficiency</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-neutral-100 rounded-lg p-3 mr-4">
                      <CalendarIcon className="h-6 w-6 text-neutral-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-neutral-900">
                        {organization.createdAt.getFullYear()}
                      </div>
                      <div className="text-sm text-neutral-600">Established</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Score Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Trust Score Trend</h3>
                <div className="flex items-end space-x-2 h-24">
                  {organization.trustTrend.map((score, index) => (
                    <div
                      key={index}
                      className="bg-primary-600 rounded-t"
                      style={{
                        height: `${(score / 100) * 100}%`,
                        width: '40px'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-neutral-600">
                  {organization.trustTrend.map((score, index) => (
                    <span key={index}>{score}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-neutral-400 mr-3" />
                    <span className="text-sm text-neutral-600">{organization.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-neutral-400 mr-3" />
                    <span className="text-sm text-neutral-600">{organization.email}</span>
                  </div>
                  {organization.website && (
                    <div className="flex items-center">
                      <GlobeAltIcon className="h-5 w-5 text-neutral-400 mr-3" />
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
                    <span className="text-sm text-neutral-600">{organization.address}</span>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Registration Details</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-neutral-600">Registration Number</span>
                    <p className="font-medium text-neutral-900">{organization.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-neutral-600">Last Updated</span>
                    <p className="font-medium text-neutral-900">
                      {organization.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Projects Coming Soon</h3>
              <p className="text-neutral-600">
                Detailed project information and fund tracking will be available here.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'funding' && (
          <div className="space-y-8">
            {/* Organization-Specific Fund Tracker */}
            <OrganizationFundTracker 
              organization={organization} 
              showAlerts={true} 
              showTrends={true} 
            />
            
            {/* Detailed Fund Usage Tracker */}
            <FundUsageTracker 
              organizationId={organization.id} 
              organizationName={organization.name} 
            />
          </div>
        )}

        {activeTab === 'transparency' && (
          <div className="space-y-6">
            {/* Financial Transparency */}
            {organization.financialTransparency && (
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Financial Transparency</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {organization.financialTransparency.transparencyScore}/100
                    </div>
                    <div className="text-sm text-neutral-600">Transparency Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {organization.financialTransparency.auditReports.length}
                    </div>
                    <div className="text-sm text-neutral-600">Audit Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {organization.financialTransparency.certifications.length}
                    </div>
                    <div className="text-sm text-neutral-600">Certifications</div>
                  </div>
                </div>

                {/* Monthly Financial Reports */}
                {organization.financialTransparency.monthlyReports.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-md font-semibold text-neutral-900 mb-4">Recent Financial Reports</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {organization.financialTransparency.monthlyReports.slice(0, 4).map((report, index) => (
                        <div key={index} className="bg-neutral-50 rounded-lg p-4">
                          <div className="font-medium text-neutral-900 mb-2">
                            {report.month} {report.year}
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Income:</span>
                              <span className="font-medium text-green-600">{formatCurrency(report.income)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-600">Expenditure:</span>
                              <span className="font-medium text-red-600">{formatCurrency(report.expenditure)}</span>
                            </div>
                            <div className="flex justify-between border-t border-neutral-200 pt-1">
                              <span className="text-neutral-600">Balance:</span>
                              <span className={`font-medium ${report.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(report.balance)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {organization.financialTransparency.certifications.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-md font-semibold text-neutral-900 mb-4">Certifications & Licenses</h4>
                    <div className="flex flex-wrap gap-2">
                      {organization.financialTransparency.certifications.map((cert, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          ✓ {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audit Information */}
                {organization.financialTransparency.auditReports.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-neutral-900 mb-4">Latest Audit Reports</h4>
                    <div className="space-y-4">
                      {organization.financialTransparency.auditReports.map((audit, index) => (
                        <div key={audit.id} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-neutral-900">{audit.auditorName}</div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              audit.compliance 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {audit.compliance ? 'Compliant' : 'Non-Compliant'}
                            </div>
                          </div>
                          <div className="text-sm text-neutral-600 mb-3">
                            Report Date: {audit.reportDate.toLocaleDateString()}
                          </div>
                          
                          {audit.findings.length > 0 && (
                            <div className="mb-3">
                              <div className="text-sm font-medium text-neutral-700 mb-1">Key Findings:</div>
                              <ul className="text-sm text-neutral-600 list-disc list-inside">
                                {audit.findings.slice(0, 3).map((finding, idx) => (
                                  <li key={idx}>{finding}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {audit.recommendations.length > 0 && (
                            <div>
                              <div className="text-sm font-medium text-neutral-700 mb-1">Recommendations:</div>
                              <ul className="text-sm text-neutral-600 list-disc list-inside">
                                {audit.recommendations.slice(0, 2).map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Services & Features for Digital Financial Services and Public Services */}
            {(organization.type === 'Digital_Financial_Service' && organization.features) && (
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Services & Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {organization.features.map((feature, index) => (
                    <div key={feature.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-900">{feature.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          feature.isActive ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {feature.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{feature.description}</p>
                      <div className="text-xs text-neutral-500">
                        Type: {feature.type.charAt(0).toUpperCase() + feature.type.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(organization.type === 'Public_Service' && organization.services) && (
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Public Services</h3>
                <div className="space-y-4">
                  {organization.services.map((service, index) => (
                    <div key={service.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-900">{service.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {service.isOnline ? 'Online Available' : 'Offline Only'}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-3">{service.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-neutral-500">Processing Time:</span>
                          <div className="font-medium">{service.processingTime}</div>
                        </div>
                        <div>
                          <span className="text-neutral-500">Category:</span>
                          <div className="font-medium">{service.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'audits' && (
          <CommunityAudit projectId={organization.id} />
        )}
      </div>
      
      {/* Donation Modal */}
      {organization && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          organization={organization}
          onDonationComplete={handleDonationComplete}
        />
      )}
    </div>
  );
};

export default OrganizationDetail;
