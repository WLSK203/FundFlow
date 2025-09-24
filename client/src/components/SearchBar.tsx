import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ClockIcon, FireIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchFilters } from '../types';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters?: SearchFilters) => void;
  showFilters?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  showFilters = true,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for suggestions and popular searches
  const popularSearches = [
    { id: '1', text: 'Education NGOs', type: 'cause', count: 1250 },
    { id: '2', text: 'Healthcare schemes', type: 'cause', count: 890 },
    { id: '3', text: 'Rural development', type: 'cause', count: 675 },
    { id: '4', text: 'Child welfare', type: 'cause', count: 540 },
    { id: '5', text: 'Women empowerment', type: 'cause', count: 420 },
    { id: '6', text: 'Environmental conservation', type: 'cause', count: 380 }
  ];

  const organizationSuggestions = [
    { id: 'org1', name: 'Akshaya Patra Foundation', type: 'organization', trustScore: 94, cause: 'Education' },
    { id: 'org2', name: 'Ministry of Rural Development', type: 'organization', trustScore: 82, cause: 'Rural Development' },
    { id: 'org3', name: 'Save the Children', type: 'organization', trustScore: 89, cause: 'Child Welfare' },
    { id: 'org4', name: 'Smile Foundation', type: 'organization', trustScore: 85, cause: 'Education' },
    { id: 'org5', name: 'CRY - Child Rights and You', type: 'organization', trustScore: 91, cause: 'Child Welfare' },
    { id: 'org6', name: 'Teach for India', type: 'organization', trustScore: 88, cause: 'Education' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Generate smart suggestions based on query
  const generateSuggestions = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return popularSearches;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const matchedOrgs = organizationSuggestions.filter(
      org => 
        org.name.toLowerCase().includes(lowerQuery) ||
        org.cause.toLowerCase().includes(lowerQuery)
    );

    const matchedCauses = popularSearches.filter(
      search => search.text.toLowerCase().includes(lowerQuery)
    );

    return [...matchedOrgs.slice(0, 4), ...matchedCauses.slice(0, 3)];
  };

  useEffect(() => {
    setSuggestions(generateSuggestions(query));
  }, [query]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'organization') {
      setQuery(suggestion.name);
      onSearch(suggestion.name, filters);
    } else {
      setQuery(suggestion.text);
      onSearch(suggestion.text, filters);
    }
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 text-lg border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {showFilters && (
            <button
              type="button"
              onClick={() => {
                setShowFilterPanel(!showFilterPanel);
                setShowSuggestions(false);
              }}
              className="absolute right-12 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions Panel */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
          {!query.trim() && (
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-center text-sm font-medium text-neutral-700 mb-3">
                <FireIcon className="h-4 w-4 mr-2 text-orange-500" />
                Popular Searches
              </div>
            </div>
          )}
          
          {query.trim() && (
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-center text-sm font-medium text-neutral-700 mb-3">
                <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-primary-500" />
                Search Results
              </div>
            </div>
          )}

          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id || index}
                className="px-4 py-3 hover:bg-neutral-50 cursor-pointer flex items-center justify-between"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center flex-1">
                  {suggestion.type === 'organization' ? (
                    <>
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-primary-600">
                          {suggestion.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900">{suggestion.name}</div>
                        <div className="text-sm text-neutral-500">{suggestion.cause}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-trust-100 text-trust-800">
                          {suggestion.trustScore}% Trust
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-3">
                        <MagnifyingGlassIcon className="h-4 w-4 text-neutral-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900">{suggestion.text}</div>
                        <div className="text-sm text-neutral-500">{suggestion.count?.toLocaleString()} organizations</div>
                      </div>
                      <ClockIcon className="h-4 w-4 text-neutral-400" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {query.trim() && (
            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <button
                onClick={() => {
                  onSearch(query, filters);
                  setShowSuggestions(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                Search for "{query}"
              </button>
            </div>
          )}
        </div>
      )}

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-6 z-30">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Type
              </label>
              <select
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Types</option>
                <option value="organization">Organizations</option>
                <option value="project">Projects</option>
                <option value="scheme">Welfare Schemes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Trust Score (Min)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={filters.trustScoreMin || ''}
                onChange={(e) => handleFilterChange('trustScoreMin', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
                className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-3">
            <button
              type="button"
              onClick={() => {
                setFilters({});
                setShowFilterPanel(false);
              }}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => {
                onSearch(query, filters);
                setShowFilterPanel(false);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
