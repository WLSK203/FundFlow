import React, { useState } from 'react';
import {
  XMarkIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserIcon,
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Organization, DonationMethod } from '../types';
import { createDonation } from '../services/mockData';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization;
  onDonationComplete: (donationDetails: any) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  organization,
  onDonationComplete
}) => {
  const [step, setStep] = useState<'amount' | 'details' | 'payment' | 'success'>('amount');
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<DonationMethod | null>(null);
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    isAnonymous: false,
    wantsTaxBenefit: true,
    recurringType: '' as 'monthly' | 'quarterly' | 'yearly' | ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [fundId, setFundId] = useState<string>('');
  const [receiptId, setReceiptId] = useState<string>('');

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDonationAmount(numValue);
    }
  };

  const handleNextStep = () => {
    if (step === 'amount' && donationAmount > 0) {
      setStep('details');
    } else if (step === 'details') {
      setStep('payment');
    }
  };

  const handlePaymentMethodSelect = (method: DonationMethod) => {
    setSelectedMethod(method);
  };

  const handleDonation = async () => {
    if (!selectedMethod || donationAmount <= 0) return;

    setIsProcessing(true);
    try {
      const donation = await createDonation({
        organizationId: organization.id,
        amount: donationAmount,
        method: selectedMethod,
        donorDetails
      });

      setFundId(donation.fundId);
      setReceiptId(donation.receiptId);
      onDonationComplete(donation);
      setStep('success');
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-label={`Donate to ${organization.name}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <HeartIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-neutral-900">
              {step === 'success' ? 'Thank You!' : `Donate to ${organization.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close donation modal"
            title="Close"
          >
            <XMarkIcon className="h-5 w-5 text-neutral-500" />
          </button>
        </div>

        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="px-6 py-4 border-b border-neutral-100">
            <div className="flex items-center justify-between text-sm" aria-label="Donation progress">
              <div className={`flex items-center ${step === 'amount' ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === 'amount' ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  1
                </div>
                <span className="ml-2">Amount</span>
              </div>
              <div className={`flex items-center ${step === 'details' ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === 'details' ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  2
                </div>
                <span className="ml-2">Details</span>
              </div>
              <div className={`flex items-center ${step === 'payment' ? 'text-primary-600' : 'text-neutral-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === 'payment' ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  3
                </div>
                <span className="ml-2">Payment</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Step 1: Amount Selection */}
          {step === 'amount' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-neutral-600">Choose your donation amount</p>
                <div className="mt-1 text-sm text-neutral-500">
                  Help make a difference in {organization.impact.beneficiariesReached.toLocaleString()} lives
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-lg border-2 transition-colors font-medium ${
                      donationAmount === amount
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                    aria-label={`Donate ${formatCurrency(amount)}`}
                    title={`Donate ${formatCurrency(amount)}`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="custom-amount">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                    ₹
                  </span>
                  <input
                    id="custom-amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter amount"
                    min="1"
                    aria-label="Custom donation amount"
                  />
                </div>
              </div>
              <button
                onClick={handleNextStep}
                disabled={donationAmount <= 0}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium rounded-lg transition-colors"
              >
                Continue with {formatCurrency(donationAmount)}
              </button>
            </div>
          )}

          {/* Step 2: Donor Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-lg font-medium text-neutral-900">
                  Donation Amount: {formatCurrency(donationAmount)}
                </p>
                <p className="text-sm text-neutral-600">Please provide your details</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={donorDetails.isAnonymous}
                    onChange={(e) => setDonorDetails(prev => ({...prev, isAnonymous: e.target.checked}))}
                    className="rounded text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-neutral-700">
                    Make this donation anonymous
                  </label>
                </div>

                {!donorDetails.isAnonymous && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="donor-name">
                        Full Name *
                      </label>
                      <input
                        id="donor-name"
                        type="text"
                        value={donorDetails.name}
                        onChange={(e) => setDonorDetails(prev => ({...prev, name: e.target.value}))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                        placeholder="Enter your full name"
                        aria-label="Full Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="donor-email">
                        Email Address *
                      </label>
                      <input
                        id="donor-email"
                        type="email"
                        value={donorDetails.email}
                        onChange={(e) => setDonorDetails(prev => ({...prev, email: e.target.value}))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                        placeholder="you@example.com"
                        aria-label="Email Address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="donor-phone">
                        Phone Number
                      </label>
                      <input
                        id="donor-phone"
                        type="tel"
                        value={donorDetails.phone}
                        onChange={(e) => setDonorDetails(prev => ({...prev, phone: e.target.value}))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your phone number"
                        aria-label="Phone Number"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="donor-message">
                    Message (Optional)
                  </label>
                  <textarea
                    id="donor-message"
                    value={donorDetails.message}
                    onChange={(e) => setDonorDetails(prev => ({...prev, message: e.target.value}))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Share why you're supporting this cause..."
                    aria-label="Donor message"
                  />
                </div>

                <div className="space-y-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="taxBenefit"
                      checked={donorDetails.wantsTaxBenefit}
                      onChange={(e) => setDonorDetails(prev => ({...prev, wantsTaxBenefit: e.target.checked}))}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="taxBenefit" className="text-sm text-neutral-700">
                      I want to claim tax benefits under 80G
                    </label>
                  </div>

                  {organization.donationMethods.some(m => m.type === 'upi') && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="recurring-type">
                        Make it recurring?
                      </label>
                      <select
                        id="recurring-type"
                        value={donorDetails.recurringType}
                        onChange={(e) => setDonorDetails(prev => ({...prev, recurringType: e.target.value as any}))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-label="Recurring donation type"
                        title="Recurring donation type"
                      >
                        <option value="">One-time donation</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('amount')}
                  className="flex-1 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!donorDetails.isAnonymous && (!donorDetails.name || !donorDetails.email)}
                  className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg font-medium text-neutral-900">
                  {formatCurrency(donationAmount)}
                </p>
                <p className="text-sm text-neutral-600">Choose payment method</p>
              </div>
              <div className="space-y-3">
                {organization.donationMethods.filter(method => method.enabled).map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors ${
                      selectedMethod?.id === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    aria-label={`Select ${method.name}`}
                    title={`Select ${method.name}`}
                  >
                    <div className="flex items-center space-x-3">
                      {method.type === 'upi' && <BanknotesIcon className="h-5 w-5 text-blue-600" />}
                      {method.type === 'card' && <CreditCardIcon className="h-5 w-5 text-green-600" />}
                      {method.type === 'netbanking' && <ShieldCheckIcon className="h-5 w-5 text-purple-600" />}
                      <div className="text-left">
                        <div className="font-medium text-neutral-900">{method.name}</div>
                        {method.processingFee && (
                          <div className="text-xs text-neutral-500">
                            Processing fee: {method.processingFee}%
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedMethod?.id === method.id && (
                      <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Secure Payment</p>
                    <p>Your payment is encrypted and secure. You'll receive a receipt via email.</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleDonation}
                  disabled={!selectedMethod || isProcessing}
                  className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    `Donate ${formatCurrency(donationAmount)}`
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <HeartIcon className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Thank you for your donation!
                </h3>
                <p className="text-neutral-600">
                  Your donation of {formatCurrency(donationAmount)} will help {organization.name}.
                </p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Fund ID:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-semibold">{fundId}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(fundId)}
                      className="p-1 hover:bg-neutral-200 rounded"
                      title="Copy Fund ID"
                      aria-label="Copy Fund ID"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4 text-neutral-600" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Receipt ID:</span>
                  <span className="font-mono text-sm">{receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Payment Method:</span>
                  <span className="font-medium">{selectedMethod?.name}</span>
                </div>
              </div>
              <a
                href={`/fund/${encodeURIComponent(fundId)}`}
                className="inline-flex items-center justify-center w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                aria-label="Track this Fund"
                title="Track this Fund"
              >
                Track this Fund
                <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
              </a>
              <button
                onClick={onClose}
                className="w-full py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
