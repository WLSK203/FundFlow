import React, { useState, useEffect } from 'react';
import {
  CurrencyRupeeIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { getFundTrackingData } from '../services/mockData';
import { FundTrackingData, Organization } from '../types';

interface OrganizationFundTrackerProps {
  organization: Organization;
  showAlerts?: boolean;
  showTrends?: boolean;
}

const OrganizationFundTracker: React.FC<OrganizationFundTrackerProps> = ({
  organization,
  showAlerts = true,
  showTrends = true
}) => {
  const [fundData, setFundData] = useState<FundTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadFundData();
    
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(() => {
      loadFundData();
    }, 30000);
    
    setRefreshInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [organization.id]);

  const loadFundData = async () => {
    try {
      const data = await getFundTrackingData(organization.id);
      setFundData(data);
    } catch (error) {
      console.error('Failed to load fund tracking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <ExclamationTriangleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-neutral-500" />;
    }
  };

  const getAlertColorClass = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-800';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
          <span className="ml-3 text-neutral-600">Loading fund tracking data...</span>
        </div>
      </div>
    );
  }

  if (!fundData) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-center py-8">
          <XCircleIcon className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
          <p className="text-neutral-600">Fund tracking data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CurrencyRupeeIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-neutral-900">
              Real-time Fund Tracking
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Updates</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Total Received</span>
              <CurrencyRupeeIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-blue-900">
              {formatAmount(fundData.totalReceived)}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-900">Total Spent</span>
              <ArrowTrendingDownIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-xl font-bold text-green-900">
              {formatAmount(fundData.totalSpent)}
            </div>
            <div className="text-xs text-green-600 mt-1">
              {((fundData.totalSpent / fundData.totalReceived) * 100).toFixed(1)}% utilized
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-900">Pending</span>
              <ClockIcon className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-xl font-bold text-orange-900">
              {formatAmount(fundData.totalPending)}
            </div>
            <div className="text-xs text-orange-600 mt-1">
              {((fundData.totalPending / fundData.totalReceived) * 100).toFixed(1)}% remaining
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900">Efficiency</span>
              <ChartBarIcon className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-xl font-bold text-purple-900">
              {fundData.efficiency.toFixed(1)}%
            </div>
            <div className={`text-xs mt-1 ${
              fundData.efficiency >= 90 
                ? 'text-green-600' 
                : fundData.efficiency >= 80 
                ? 'text-yellow-600' 
                : 'text-red-600'
            }`}>
              {fundData.efficiency >= 90 ? 'Excellent' : 
               fundData.efficiency >= 80 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        {/* Efficiency Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Fund Utilization Progress</span>
            <span className="text-sm font-semibold text-neutral-900">
              {((fundData.totalSpent / fundData.totalReceived) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
              style={{ width: `${(fundData.totalSpent / fundData.totalReceived) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">
          Fund Allocation by Category
        </h4>
        
        <div className="space-y-3">
          {fundData.categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-neutral-900">{category.name}</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-right">
                  <div className="text-neutral-600">Allocated</div>
                  <div className="font-semibold">{formatAmount(category.allocated)}</div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-600">Spent</div>
                  <div className="font-semibold text-green-600">{formatAmount(category.spent)}</div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-600">Efficiency</div>
                  <div className={`font-semibold ${
                    category.efficiency >= 90 
                      ? 'text-green-600' 
                      : category.efficiency >= 80 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {category.efficiency.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      {showAlerts && fundData.alerts.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
            Fund Tracking Alerts ({fundData.alerts.length})
          </h4>
          
          <div className="space-y-3">
            {fundData.alerts
              .filter(alert => !alert.resolved)
              .slice(0, 3) // Show only top 3 alerts
              .map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${getAlertColorClass(alert.severity)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">
                        {alert.type.replace('_', ' ').toUpperCase()} Alert
                      </div>
                      <div className="text-sm">{alert.message}</div>
                      <div className="text-xs mt-2 opacity-75">
                        {new Date(alert.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'critical' || alert.severity === 'high'
                        ? 'bg-red-100 text-red-800'
                        : alert.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Monthly Trends Mini Chart */}
      {showTrends && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h4 className="text-lg font-semibold text-neutral-900 mb-4">
            Recent Monthly Performance
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fundData.monthlyData.slice(-3).map((month, index) => (
              <div key={month.month} className="bg-neutral-50 rounded-lg p-4">
                <div className="text-sm font-medium text-neutral-600 mb-2">{month.month}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Received:</span>
                    <span className="font-medium text-blue-600">{formatAmount(month.received)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Spent:</span>
                    <span className="font-medium text-green-600">{formatAmount(month.spent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Balance:</span>
                    <span className="font-medium text-orange-600">{formatAmount(month.balance)}</span>
                  </div>
                </div>
                
                {/* Mini utilization bar */}
                <div className="mt-3">
                  <div className="w-full bg-neutral-200 rounded-full h-1">
                    <div 
                      className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-green-400"
                      style={{ width: `${(month.spent / month.received) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {((month.spent / month.received) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-center text-sm text-neutral-500">
        Last updated: {new Date().toLocaleTimeString()} • Auto-refresh every 30 seconds
      </div>
    </div>
  );
};

export default OrganizationFundTracker;
