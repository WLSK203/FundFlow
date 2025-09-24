import React, { useState, useEffect } from 'react';
import { getFundTrackingData } from '../services/mockData';
import { FundTrackingData } from '../types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  CurrencyRupeeIcon, 
  ChartPieIcon, 
  ArrowTrendingUpIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

interface ExpenditureCategory {
  category: string;
  allocated: number;
  spent: number;
  pending: number;
  efficiency: number;
  color: string;
}

interface MonthlyExpenditure {
  month: string;
  planned: number;
  actual: number;
  variance: number;
}

interface ProjectExpenditure {
  id: string;
  name: string;
  totalBudget: number;
  spent: number;
  remaining: number;
  status: 'on-track' | 'delayed' | 'over-budget' | 'completed';
  completion: number;
}

interface FundUsageTrackerProps {
  organizationId?: string; // Optional - if not provided, shows general data
  organizationName?: string;
}

const FundUsageTracker: React.FC<FundUsageTrackerProps> = ({ organizationId, organizationName }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedView, setSelectedView] = useState<'overview' | 'categories' | 'projects' | 'trends'>('overview');
  const [fundData, setFundData] = useState<FundTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load fund tracking data for specific organization
  useEffect(() => {
    if (organizationId) {
      setIsLoading(true);
      getFundTrackingData(organizationId).then(data => {
        setFundData(data);
        setIsLoading(false);
      }).catch(error => {
        console.error('Failed to load fund tracking data:', error);
        setIsLoading(false);
      });
    }
  }, [organizationId]);

  // Use organization-specific data or fall back to mock data for expenditure categories
  const expenditureData: ExpenditureCategory[] = [
    { category: 'Education Programs', allocated: 45000000, spent: 38500000, pending: 6500000, efficiency: 85.5, color: '#3b82f6' },
    { category: 'Healthcare Initiatives', allocated: 35000000, spent: 31200000, pending: 3800000, efficiency: 89.1, color: '#10b981' },
    { category: 'Infrastructure Development', allocated: 28000000, spent: 22400000, pending: 5600000, efficiency: 80.0, color: '#f59e0b' },
    { category: 'Administrative Costs', allocated: 12000000, spent: 10800000, pending: 1200000, efficiency: 90.0, color: '#ef4444' },
    { category: 'Community Outreach', allocated: 15000000, spent: 13250000, pending: 1750000, efficiency: 88.3, color: '#8b5cf6' },
    { category: 'Emergency Relief', allocated: 20000000, spent: 18900000, pending: 1100000, efficiency: 94.5, color: '#06b6d4' }
  ];

  // Monthly expenditure trends
  const monthlyData: MonthlyExpenditure[] = [
    { month: 'Jan', planned: 12500000, actual: 11800000, variance: -700000 },
    { month: 'Feb', planned: 13200000, actual: 13100000, variance: -100000 },
    { month: 'Mar', planned: 14100000, actual: 14600000, variance: 500000 },
    { month: 'Apr', planned: 13800000, actual: 13200000, variance: -600000 },
    { month: 'May', planned: 15200000, actual: 15800000, variance: 600000 },
    { month: 'Jun', planned: 14500000, actual: 14100000, variance: -400000 }
  ];

  // Project-wise expenditure
  const projectData: ProjectExpenditure[] = [
    {
      id: '1',
      name: 'Digital Education Initiative',
      totalBudget: 25000000,
      spent: 18750000,
      remaining: 6250000,
      status: 'on-track',
      completion: 75
    },
    {
      id: '2',
      name: 'Rural Healthcare Centers',
      totalBudget: 40000000,
      spent: 32000000,
      remaining: 8000000,
      status: 'delayed',
      completion: 60
    },
    {
      id: '3',
      name: 'Clean Water Project',
      totalBudget: 18000000,
      spent: 19500000,
      remaining: -1500000,
      status: 'over-budget',
      completion: 95
    },
    {
      id: '4',
      name: 'Women Empowerment Program',
      totalBudget: 12000000,
      spent: 12000000,
      remaining: 0,
      status: 'completed',
      completion: 100
    }
  ];

  // Calculate totals using organization-specific data or fallback to mock data
  const expenditureCategories = fundData ? fundData.categories : expenditureData;
  const monthlyTrends = fundData ? fundData.monthlyData : monthlyData;
  
  const totalAllocated = fundData ? fundData.totalReceived : expenditureData.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = fundData ? fundData.totalSpent : expenditureData.reduce((sum, item) => sum + item.spent, 0);
  const totalPending = fundData ? fundData.totalPending : expenditureData.reduce((sum, item) => sum + item.pending, 0);
  const overallEfficiency = fundData ? fundData.efficiency : (totalSpent / totalAllocated) * 100;

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'on-track': return 'text-blue-600 bg-blue-50';
      case 'delayed': return 'text-yellow-600 bg-yellow-50';
      case 'over-budget': return 'text-red-600 bg-red-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />;
      case 'on-track': return <ArrowTrendingUpIcon className="h-4 w-4" />;
      case 'delayed': return <ClockIcon className="h-4 w-4" />;
      case 'over-budget': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-semibold text-neutral-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${formatAmount(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
          <span className="ml-3 text-neutral-600">Loading fund tracking data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            {organizationName ? `${organizationName} - Fund Usage & Expenditure` : 'Fund Usage & Expenditure'}
          </h2>
          <p className="text-neutral-600">
            {organizationId 
              ? 'Real-time tracking of fund utilization for this organization'
              : 'Comprehensive tracking of fund utilization and spending patterns'
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          {(['overview', 'categories', 'projects', 'trends'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedView === view
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-neutral-600">Total Allocated</div>
            <CurrencyRupeeIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{formatAmount(totalAllocated)}</div>
          <div className="text-sm text-neutral-500">Across all programs</div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-neutral-600">Total Spent</div>
            <ArrowDownIcon className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{formatAmount(totalSpent)}</div>
          <div className="text-sm text-green-600">
            {overallEfficiency.toFixed(1)}% of allocated
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-neutral-600">Pending</div>
            <ClockIcon className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{formatAmount(totalPending)}</div>
          <div className="text-sm text-orange-600">
            {((totalPending / totalAllocated) * 100).toFixed(1)}% remaining
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-neutral-600">Efficiency Score</div>
            <ChartPieIcon className="h-5 w-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-neutral-900">{overallEfficiency.toFixed(1)}%</div>
          <div className="text-sm text-primary-600">Above target (85%)</div>
        </div>
      </div>

      {/* Main Content Based on Selected View */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expenditure by Category - Pie Chart */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Expenditure by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenditureCategories.map(cat => ({
                    ...cat,
                    category: 'name' in cat ? cat.name : cat.category // Handle both data types
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="spent"
                  nameKey="category"
                >
                  {expenditureCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatAmount(value)} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {expenditureCategories.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-700 truncate">{'name' in item ? item.name : item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Monthly Expenditure Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends.map(month => ({
                month: month.month,
                planned: 'received' in month ? month.received : month.planned, // Handle both data types
                actual: 'spent' in month ? month.spent : month.actual
              }))}>
                <defs>
                  <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(0)}Cr`} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#plannedGradient)" 
                  name="Planned"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#actualGradient)" 
                  name="Actual"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedView === 'categories' && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Category-wise Breakdown</h3>
          
          <div className="space-y-6">
            {expenditureCategories.map((category, index) => (
              <div key={index} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-neutral-900">{'name' in category ? category.name : category.category}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-neutral-600">
                      Efficiency: {category.efficiency}%
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.efficiency >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : category.efficiency >= 80 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.efficiency >= 90 ? 'Excellent' : category.efficiency >= 80 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-neutral-600">Allocated</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {formatAmount(category.allocated)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Spent</div>
                    <div className="text-lg font-semibold text-green-600">
                      {formatAmount(category.spent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Pending</div>
                    <div className="text-lg font-semibold text-orange-600">
                      {formatAmount(category.pending)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                      style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-neutral-700">
                    {((category.spent / category.allocated) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'projects' && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Project-wise Expenditure</h3>
          
          <div className="space-y-4">
            {projectData.map((project) => (
              <div key={project.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-neutral-900">{project.name}</h4>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-neutral-600">Total Budget</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {formatAmount(project.totalBudget)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Spent</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {formatAmount(project.spent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Remaining</div>
                    <div className={`text-lg font-semibold ${
                      project.remaining < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {formatAmount(Math.abs(project.remaining))}
                      {project.remaining < 0 && ' over'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600">Completion</div>
                    <div className="text-lg font-semibold text-neutral-900">
                      {project.completion}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        project.status === 'completed' 
                          ? 'bg-green-500' 
                          : project.status === 'over-budget'
                          ? 'bg-red-500'
                          : project.status === 'delayed'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(project.completion, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'trends' && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Expenditure Trends Analysis</h3>
          
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrends.map(month => ({
                month: month.month,
                planned: 'received' in month ? month.received : month.planned,
                actual: 'spent' in month ? month.spent : month.actual
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(0)}Cr`} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Planned" 
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Actual"
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Budget Variance</h4>
              <div className="text-2xl font-bold text-blue-700">±3.2%</div>
              <div className="text-sm text-blue-600">Average monthly variance</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">On-time Delivery</h4>
              <div className="text-2xl font-bold text-green-700">87%</div>
              <div className="text-sm text-green-600">Projects completed on schedule</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">Cost Overruns</h4>
              <div className="text-2xl font-bold text-orange-700">5.8%</div>
              <div className="text-sm text-orange-600">Projects exceeding budget</div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts and Recommendations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="flex items-center text-lg font-semibold text-yellow-900 mb-4">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          Alerts & Recommendations
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900">Clean Water Project over budget</div>
              <div className="text-sm text-neutral-600">
                Project has exceeded allocated budget by ₹15L. Review expenditure and consider budget reallocation.
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900">Rural Healthcare Centers delayed</div>
              <div className="text-sm text-neutral-600">
                Project completion at 60% despite 70% timeline elapsed. Consider resource reallocation.
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            <div>
              <div className="font-medium text-neutral-900">Administrative costs optimization</div>
              <div className="text-sm text-neutral-600">
                Administrative efficiency at 90%. Consider reallocating surplus to program activities.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundUsageTracker;
