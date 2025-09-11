import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
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
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-4 text-lg border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {showFilters && (
            <button
              type="button"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
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

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-6 z-10">
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
