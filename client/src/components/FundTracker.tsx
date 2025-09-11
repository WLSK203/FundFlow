import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface FundFlow {
  timestamp: string;
  amount: number;
  from: string;
  to: string;
  type: 'donation' | 'disbursement' | 'expense';
}

const FundTracker: React.FC = () => {
  const [activeTransactions, setActiveTransactions] = useState<FundFlow[]>([]);
  const [dailyFlow, setDailyFlow] = useState<any[]>([]);
  const [currentFlow, setCurrentFlow] = useState(0);

  useEffect(() => {
    // Simulate real-time fund tracking data
    const generateMockData = () => {
      const dailyData = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dailyData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          inflow: Math.floor(Math.random() * 50000000) + 10000000, // 1-5 crores
          outflow: Math.floor(Math.random() * 40000000) + 8000000,  // 0.8-4.8 crores
          netFlow: 0
        });
      }
      
      dailyData.forEach(item => {
        item.netFlow = item.inflow - item.outflow;
      });
      
      setDailyFlow(dailyData);

      // Generate active transactions
      const transactions: FundFlow[] = [
        {
          timestamp: new Date().toISOString(),
          amount: 2500000,
          from: 'PM CARES Fund',
          to: 'Akshaya Patra Foundation',
          type: 'donation'
        },
        {
          timestamp: new Date(Date.now() - 300000).toISOString(),
          amount: 180000,
          from: 'Save the Children',
          to: 'Local Contractor - School Construction',
          type: 'expense'
        },
        {
          timestamp: new Date(Date.now() - 600000).toISOString(),
          amount: 750000,
          from: 'Ministry of Health',
          to: 'Jan Aushadhi Stores',
          type: 'disbursement'
        }
      ];
      
      setActiveTransactions(transactions);
      setCurrentFlow(transactions.reduce((sum, t) => sum + t.amount, 0));
    };

    generateMockData();
    
    // Update every 30 seconds to simulate real-time updates
    const interval = setInterval(generateMockData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'donation': return 'text-trust-600 bg-trust-50';
      case 'disbursement': return 'text-primary-600 bg-primary-50';
      case 'expense': return 'text-orange-600 bg-orange-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-trust-50 rounded-lg p-4 border border-trust-200">
          <div className="text-2xl font-bold text-trust-600">
            {formatAmount(currentFlow)}
          </div>
          <div className="text-sm text-trust-700">Active Flow (Last Hour)</div>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-trust-600 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs text-trust-600">Live</span>
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="text-2xl font-bold text-primary-600">
            ₹{(dailyFlow.reduce((sum, item) => sum + item.inflow, 0) / 10000000).toFixed(1)}Cr
          </div>
          <div className="text-sm text-primary-700">Weekly Inflow</div>
        </div>

        <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-300">
          <div className="text-2xl font-bold text-neutral-700">
            {activeTransactions.length}
          </div>
          <div className="text-sm text-neutral-600">Active Transactions</div>
        </div>
      </div>

      {/* Daily Fund Flow Chart */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">7-Day Fund Flow Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyFlow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(0)}Cr`} />
            <Tooltip 
              formatter={(value: number) => [formatAmount(value), '']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="inflow" 
              stroke="#22c55e" 
              strokeWidth={3}
              name="Inflow"
            />
            <Line 
              type="monotone" 
              dataKey="outflow" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Outflow"
            />
            <Line 
              type="monotone" 
              dataKey="netFlow" 
              stroke="#64748b" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Net Flow"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Real-time Transaction Feed */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Live Transaction Feed</h3>
          <div className="flex items-center text-sm text-trust-600">
            <div className="w-2 h-2 bg-trust-600 rounded-full mr-2 animate-pulse"></div>
            Real-time
          </div>
        </div>
        
        <div className="space-y-3">
          {activeTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTransactionColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                  <span className="text-sm text-neutral-600">
                    {formatTimestamp(transaction.timestamp)}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-sm text-neutral-700">
                    {transaction.from} → {transaction.to}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-neutral-900">
                  {formatAmount(transaction.amount)}
                </div>
                <div className="text-xs text-neutral-500">
                  Verified on blockchain
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZKP Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Privacy-Preserving Transparency:</strong> All beneficiary information is anonymized using Zero-Knowledge Proofs (ZKPs). Individual identities remain cryptographically protected while maintaining full transaction transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTracker;
