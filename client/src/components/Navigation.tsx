import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon, ChartBarIcon, UserGroupIcon, InformationCircleIcon, HandRaisedIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm relative z-50">
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
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Home
            </Link>

            <Link
              to="/search"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/search')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Search
            </Link>

            <Link
              to="/organizations"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/organizations')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Organizations
            </Link>

            <Link
              to="/track"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/track')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Track Fund
            </Link>

            <Link
              to="/about"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/about')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <InformationCircleIcon className="h-4 w-4 mr-2" />
              About
            </Link>

            <Link
              to="/partnership"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/partnership')
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
            >
              <HandRaisedIcon className="h-4 w-4 mr-2" />
              Partner
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded-lg transition-colors border border-neutral-200"
                >
                  <UserCircleIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700 max-w-[150px] truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-xs text-neutral-500">Signed in as</p>
                      <p className="text-sm font-medium text-neutral-900 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
