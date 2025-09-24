import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDonationByFundId } from '../services/mockData';
import { CurrencyRupeeIcon, MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const FundIdTracker: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fundIdInput, setFundIdInput] = useState<string>(searchParams.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<ReturnType<typeof getDonationByFundId>> | null>(null);

  const canSearch = useMemo(() => fundIdInput.trim().length > 0, [fundIdInput]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canSearch) return;
    setError(null);
    setLoading(true);
    try {
      const data = await getDonationByFundId(fundIdInput.trim());
      if (!data) {
        setResult(null);
        setError('No records found for this Fund ID.');
      } else {
        setResult(data);
        setSearchParams({ id: fundIdInput.trim() });
      }
    } catch (err) {
      setError('Failed to fetch fund details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && !result && !loading) {
      setFundIdInput(id);
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-800 mb-6">
          <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back
        </button>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Track Your Fund</h1>
          <p className="text-neutral-600 mb-4">Enter the Fund ID from your donation receipt to view its details and usage.</p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={fundIdInput}
              onChange={(e) => setFundIdInput(e.target.value)}
              placeholder="e.g., FUND-ABC123XYZ9"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
              aria-label="Fund ID"
            />
            <button
              type="submit"
              disabled={!canSearch || loading}
              className="inline-flex items-center justify-center px-5 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg font-medium"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                  Track
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">Donation Details</h2>
                  <div className="mt-2 text-sm text-neutral-600">Fund ID: <span className="font-mono font-medium">{result.donation.fundId}</span></div>
                  <div className="text-sm text-neutral-600">Organization ID: <span className="font-mono">{result.donation.organizationId}</span></div>
                  <div className="text-sm text-neutral-600">Receipt: <span className="font-mono">{result.donation.receiptId}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-500 text-sm">Amount</div>
                  <div className="text-2xl font-bold text-neutral-900">{formatCurrency(result.donation.amount)}</div>
                  <div className="text-xs text-neutral-500 mt-1 capitalize">{result.donation.status}</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-neutral-50">
                  <div className="text-xs text-neutral-600">Date</div>
                  <div className="text-neutral-900">{new Date(result.donation.createdAt).toLocaleString()}</div>
                </div>
                <div className="p-4 rounded-lg bg-neutral-50">
                  <div className="text-xs text-neutral-600">Payment Method</div>
                  <div className="text-neutral-900">{result.donation.method.name}</div>
                </div>
                <div className="p-4 rounded-lg bg-neutral-50">
                  <div className="text-xs text-neutral-600">Tax Benefit</div>
                  <div className="text-neutral-900">{result.donation.taxBenefit ? 'Eligible' : 'Not claimed'}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Usage Breakdown</h3>
              <div className="space-y-3">
                {result.usage.map(u => (
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
        )}
      </div>
    </div>
  );
};

export default FundIdTracker;


