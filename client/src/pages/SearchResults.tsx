import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchResult, searchData } from '../services/mockData';
import { SearchFilters } from '../types';
import SearchBar from '../components/SearchBar';
import TrustScoreDisplay from '../components/TrustScoreDisplay';
import { 
  BuildingOfficeIcon, 
  ShieldCheckIcon, 
  MapPinIcon, 
  CurrencyRupeeIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<SearchResult>({ organizations: [], schemes: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  // Get initial query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setCurrentQuery(query);
    // Always load results, even when query is empty
    handleSearch(query);
  }, [location.search]);

  const handleSearch = async (query: string, filters?: SearchFilters) => {
    setLoading(true);
    setCurrentQuery(query);
    
    // Update URL with search query
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    navigate(`/search?${params.toString()}`, { replace: true });

    try {
      const results = await searchData(query, filters);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <SearchBar
              placeholder="Search for NGOs, projects, or welfare schemes..."
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        {!loading && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {currentQuery ? `Search results for "${currentQuery}"` : 'All Organizations & Schemes'}
            </h1>
            <p className="text-neutral-600">
              Found {searchResults.total} results ({searchResults.organizations.length} organizations, {searchResults.schemes.length} schemes)
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Searching...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && currentQuery && searchResults.total === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">No results found</h2>
            <p className="text-neutral-600">Try different keywords or adjust your filters</p>
          </div>
        )}

        {/* Organizations Results */}
        {searchResults.organizations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 mr-2 text-primary-600" />
              Organizations ({searchResults.organizations.length})
            </h2>
            <div className="grid gap-6">
              {searchResults.organizations.map(organization => (
                <div
                  key={organization.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/organization/${organization.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-1">{organization.name}</h3>
                      <div className="flex items-center text-sm text-neutral-600 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                          organization.type === 'NGO' ? 'bg-green-100 text-green-800' :
                          organization.type === 'Government' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {organization.type}
                        </span>
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {organization.address}
                      </div>
                    </div>
                    <TrustScoreDisplay score={organization.trustScore} size="large" />
                  </div>

                  <p className="text-neutral-700 mb-4 line-clamp-2">{organization.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                        {formatCurrency(organization.totalFundsReceived)} raised
                      </div>
                      <div className="flex items-center">
                        <ShieldCheckIcon className="h-4 w-4 mr-1" />
                        {organization.verificationStatus}
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Welfare Schemes Results */}
        {searchResults.schemes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
              <DocumentTextIcon className="h-6 w-6 mr-2 text-trust-600" />
              Welfare Schemes ({searchResults.schemes.length})
            </h2>
            <div className="grid gap-6">
              {searchResults.schemes.map(scheme => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/scheme/${scheme.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-1">{scheme.name}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{scheme.department}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        scheme.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {scheme.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-700 mb-4 line-clamp-2">{scheme.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                        {formatCurrency(scheme.budget.allocated)} allocated
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {(scheme.budget.beneficiaries / 1000000).toFixed(1)}M beneficiaries
                      </div>
                    </div>
                    <button className="text-trust-600 hover:text-trust-700 font-medium text-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !currentQuery && searchResults.total === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">No items to display</h2>
            <p className="text-neutral-600">Try searching for organizations, projects, or welfare schemes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
