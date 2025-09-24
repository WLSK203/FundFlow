import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  StarIcon,
  HeartIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Organization } from '../types';
import { searchOrganizations } from '../services/mockData';

interface OrganizationListProps {
  onOrganizationSelect?: (organization: Organization) => void;
  showDonateButton?: boolean;
  onDonate?: (organization: Organization) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  onOrganizationSelect,
  showDonateButton = true,
  onDonate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    location: '',
    trustScoreMin: 0,
    donationEnabled: false
  });

  const organizationTypes = [
    { value: '', label: 'All Types' },
    { value: 'NGO', label: 'NGOs' },
    { value: 'Government', label: 'Government' },
    { value: 'Private', label: 'Private/Corporate' },
    { value: 'Digital_Financial_Service', label: 'Digital Financial Services' },
    { value: 'Public_Service', label: 'Public Services' }
  ];

  const categories = [
    'All Categories', 'Education', 'Healthcare', 'Environment', 'Child Welfare',
    'Rural Development', 'Technology', 'Fintech', 'Administrative'
  ];

  useEffect(() => {
    loadOrganizations();
  }, [searchQuery, filters]);

  const loadOrganizations = async () => {
    setIsLoading(true);
    try {
      const result = await searchOrganizations(searchQuery, {
        type: 'organization',
        organizationType: filters.type,
        location: filters.location,
        trustScoreMin: filters.trustScoreMin
      });
      
      let filteredOrgs = result.organizations;
      
      // Apply additional filters
      if (filters.category && filters.category !== 'All Categories') {
        filteredOrgs = filteredOrgs.filter(org => org.category === filters.category);
      }
      
      if (filters.donationEnabled) {
        filteredOrgs = filteredOrgs.filter(org => org.donationEnabled);
      }
      
      setOrganizations(filteredOrgs);
    } catch (error) {
      console.error('Failed to load organizations:', error);
      setOrganizations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'NGO':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'Government':
        return <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />;
      case 'Private':
        return <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />;
      case 'Digital_Financial_Service':
        return <CreditCardIcon className="h-5 w-5 text-green-600" />;
      case 'Public_Service':
        return <ShieldCheckIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <UserGroupIcon className="h-5 w-5 text-neutral-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NGO':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Government':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Private':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Digital_Financial_Service':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Public_Service':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  const formatTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      location: '',
      trustScoreMin: 0,
      donationEnabled: false
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== 0 && value !== false
  ).length;

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-neutral-900">Organizations Directory</h2>
          <div className="text-sm text-neutral-600">
            {organizations.length} organization{organizations.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search organizations, categories, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Organization Type Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Organization Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {organizationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mumbai, Delhi"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Trust Score Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Minimum Trust Score: {filters.trustScoreMin}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.trustScoreMin}
                  onChange={(e) => setFilters(prev => ({...prev, trustScoreMin: parseInt(e.target.value)}))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Additional Filters */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.donationEnabled}
                  onChange={(e) => setFilters(prev => ({...prev, donationEnabled: e.target.checked}))}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">Accepting donations only</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
          <span className="ml-3 text-neutral-600">Loading organizations...</span>
        </div>
      )}

      {/* Organization Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className="bg-white rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onOrganizationSelect?.(organization)}
            >
              {/* Organization Header */}
              <div className="p-6 border-b border-neutral-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(organization.type)}
                    <div>
                      <h3 className="font-semibold text-neutral-900 line-clamp-2">
                        {organization.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(organization.type)}`}>
                          {formatTypeLabel(organization.type)}
                        </span>
                        <span className="text-xs text-neutral-500">{organization.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium text-neutral-900">{organization.trustScore}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 line-clamp-3 mb-3">
                  {organization.description}
                </p>

                <div className="flex items-center text-sm text-neutral-500">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {organization.address}
                </div>
              </div>

              {/* Organization Stats */}
              <div className="p-6 bg-neutral-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-neutral-600">Impact Score</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {organization.impact.impactScore}/100
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-600">Beneficiaries</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {organization.impact.beneficiariesReached.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-600">Funds Received</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {formatAmount(organization.totalFundsReceived)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-600">Efficiency</div>
                    <div className={`text-lg font-semibold ${
                      organization.impact.fundUtilizationRate >= 90 
                        ? 'text-green-600' 
                        : organization.impact.fundUtilizationRate >= 80 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                    }`}>
                      {organization.impact.fundUtilizationRate.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrganizationSelect?.(organization);
                    }}
                    className="flex-1 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium transition-colors text-sm"
                  >
                    View Details
                  </button>
                  
                  {showDonateButton && organization.donationEnabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDonate?.(organization);
                      }}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm flex items-center space-x-1"
                    >
                      <HeartIcon className="h-4 w-4" />
                      <span>Donate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && organizations.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No organizations found</h3>
          <p className="text-neutral-600 mb-4">Try adjusting your search criteria or filters</p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
