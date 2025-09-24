import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDonationByFundId } from '../services/mockData';
import { CurrencyRupeeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const FundTrackerPage: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof getDonationByFundId>> | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!fundId) return;
      setLoading(true);
      const result = await getDonationByFundId(fundId);
      if (!result) {
        setNotFound(true);
      } else {
        setData(result);
      }
      setLoading(false);
    };
    load();
  }, [fundId]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent mx-auto mb-4" />
          <p className="text-neutral-600">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🔎</div>
          <h1 className="text-xl font-bold text-neutral-900 mb-2">Fund not found</h1>
          <p className="text-neutral-600 mb-6">We couldn't find any donation with Fund ID "{fundId}".</p>
          <button onClick={() => navigate('/organizations')} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium">
            Go to Organizations
          </button>
        </div>
      </div>
    );
  }

  const { donation, usage } = data;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-800 mb-4">
          <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back
        </button>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-1">Fund Tracking</h1>
              <div className="text-sm text-neutral-600">Fund ID: <span className="font-mono font-medium">{donation.fundId}</span></div>
              <div className="text-sm text-neutral-600">Organization ID: <span className="font-mono">{donation.organizationId}</span></div>
            </div>
            <div className="text-right">
              <div className="text-neutral-500 text-sm">Amount</div>
              <div className="text-2xl font-bold text-neutral-900">{formatCurrency(donation.amount)}</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-neutral-50">
              <div className="text-xs text-neutral-600">Status</div>
              <div className="text-neutral-900 font-semibold capitalize">{donation.status}</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50">
              <div className="text-xs text-neutral-600">Receipt</div>
              <div className="text-neutral-900 font-mono text-sm">{donation.receiptId}</div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-50">
              <div className="text-xs text-neutral-600">Date</div>
              <div className="text-neutral-900">{new Date(donation.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Usage Breakdown</h2>
          <div className="space-y-3">
            {usage.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                <div>
                  <div className="font-medium text-neutral-900">{u.description}</div>
                  <div className="text-xs text-neutral-500">{new Date(u.date).toLocaleDateString()} • {u.category}</div>
                </div>
                <div className="flex items-center text-neutral-900 font-semibold">
                  <CurrencyRupeeIcon className="h-4 w-4 mr-0.5" /> {u.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTrackerPage;
