import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon, ChartBarIcon, UserGroupIcon, InformationCircleIcon, HandRaisedIcon, UsersIcon } from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-primary-600 rounded-lg p-2 mr-3">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">FundFlow</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Home
            </Link>
            
            <Link
              to="/search"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/search') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Search
            </Link>

            <Link
              to="/organizations"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/organizations') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Organizations
            </Link>

            <Link
            to="/track"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive('/track') 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Track Fund
          </Link>

          <Link
              to="/about"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/about') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <InformationCircleIcon className="h-4 w-4 mr-2" />
              About
            </Link>

            <Link
              to="/partnership"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/partnership') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <HandRaisedIcon className="h-4 w-4 mr-2" />
              Partner
            </Link>

            <Link
              to="/team"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive('/team') 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <UsersIcon className="h-4 w-4 mr-2" />
              Team
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
