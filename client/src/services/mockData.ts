import { 
  Organization, 
  Project, 
  WelfareScheme, 
  SearchFilters, 
  DonationMethod, 
  ImpactMetrics, 
  FinancialTransparency,
  OrganizationFeature,
  PublicService,
  FundTrackingData
} from '../types';

// Mock Organizations
export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Akshaya Patra Foundation',
    registrationNumber: 'REG-2001-APF-001',
    type: 'NGO',
    category: 'Education',
    trustScore: 94,
    trustTrend: [89, 91, 92, 94, 94],
    description: 'Largest NGO in India providing mid-day meals to school children',
    website: 'https://www.akshayapatra.org',
    email: 'info@akshayapatra.org',
    phone: '+91-80-3021-4444',
    address: 'Bangalore, Karnataka',
    logo: '/images/akshaya-patra-logo.png',
    banner: '/images/akshaya-patra-banner.jpg',
    projects: [],
    totalFundsReceived: 450000000,
    totalFundsDisbursed: 420000000,
    verificationStatus: 'verified',
    donationEnabled: true,
    donationMethods: [
      { id: 'upi-1', type: 'upi', name: 'UPI Payment', details: { vpa: 'donate@akshayapatra' }, enabled: true },
      { id: 'card-1', type: 'card', name: 'Credit/Debit Card', details: {}, enabled: true, processingFee: 2.5 },
      { id: 'net-1', type: 'netbanking', name: 'Net Banking', details: {}, enabled: true }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/akshayapatra',
      twitter: 'https://twitter.com/akshayapatra',
      linkedin: 'https://linkedin.com/company/akshaya-patra'
    },
    impact: {
      beneficiariesReached: 1800000,
      projectsCompleted: 245,
      fundUtilizationRate: 93.3,
      impactScore: 94,
      outcomeMeasures: [
        { metric: 'Meals Served Daily', value: 1800000, unit: 'meals', category: 'Nutrition', reportingDate: new Date('2024-12-01') },
        { metric: 'School Enrollment Increase', value: 15, unit: 'percentage', category: 'Education', reportingDate: new Date('2024-11-01') }
      ],
      geographicReach: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Odisha'],
      yearlyGrowth: 12.5
    },
    financialTransparency: {
      auditReports: [
        {
          id: 'audit-1',
          auditorName: 'KPMG India',
          reportUrl: '/audits/akshaya-patra-2024.pdf',
          reportDate: new Date('2024-03-31'),
          findings: ['Clean financial records', 'Proper fund utilization'],
          recommendations: ['Expand digital payment methods'],
          compliance: true
        }
      ],
      monthlyReports: [
        { month: 'November', year: 2024, income: 38500000, expenditure: 35200000, balance: 3300000 },
        { month: 'October', year: 2024, income: 42000000, expenditure: 39800000, balance: 2200000 }
      ],
      certifications: ['ISO 22000', 'FSSAI License', '80G Certificate'],
      transparencyScore: 94,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2001-06-15'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '2',
    name: 'Ministry of Rural Development',
    registrationNumber: 'GOI-MRD-2014',
    type: 'Government',
    category: 'Rural Development',
    trustScore: 82,
    trustTrend: [78, 79, 80, 81, 82],
    description: 'Government ministry overseeing rural development schemes',
    website: 'https://rural.nic.in',
    email: 'info@rural.nic.in',
    phone: '+91-11-2338-2045',
    address: 'New Delhi',
    projects: [],
    totalFundsReceived: 1200000000,
    totalFundsDisbursed: 980000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    impact: {
      beneficiariesReached: 25000000,
      projectsCompleted: 156,
      fundUtilizationRate: 81.7,
      impactScore: 82,
      outcomeMeasures: [],
      geographicReach: ['Pan-India'],
      yearlyGrowth: 6.8
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['Government Certified'],
      transparencyScore: 82,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2014-05-26'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '3',
    name: 'Teach for India',
    registrationNumber: 'REG-2009-TFI-003',
    type: 'NGO',
    category: 'Education',
    trustScore: 89,
    trustTrend: [85, 87, 88, 89, 89],
    description: 'Non-profit organization working to eliminate educational inequity',
    website: 'https://teachforindia.org',
    email: 'info@teachforindia.org',
    phone: '+91-22-6619-0200',
    address: 'Mumbai, Maharashtra',
    projects: [],
    totalFundsReceived: 280000000,
    totalFundsDisbursed: 265000000,
    verificationStatus: 'verified',
    donationEnabled: true,
    donationMethods: [
      { id: 'upi-3', type: 'upi', name: 'UPI Payment', details: {}, enabled: true },
      { id: 'card-3', type: 'card', name: 'Credit/Debit Card', details: {}, enabled: true }
    ],
    impact: {
      beneficiariesReached: 75000,
      projectsCompleted: 45,
      fundUtilizationRate: 94.6,
      impactScore: 89,
      outcomeMeasures: [],
      geographicReach: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
      yearlyGrowth: 15.2
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['80G Certificate'],
      transparencyScore: 89,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2009-08-20'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '4',
    name: 'Kerala State IT Mission',
    registrationNumber: 'GOV-KER-IT-2001',
    type: 'Government',
    category: 'Technology',
    trustScore: 86,
    trustTrend: [82, 84, 85, 86, 86],
    description: 'State government agency promoting IT development in Kerala',
    email: 'info@itmission.kerala.gov.in',
    phone: '+91-471-2700-500',
    address: 'Thiruvananthapuram, Kerala',
    projects: [],
    totalFundsReceived: 850000000,
    totalFundsDisbursed: 790000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    impact: {
      beneficiariesReached: 3500000,
      projectsCompleted: 78,
      fundUtilizationRate: 92.9,
      impactScore: 86,
      outcomeMeasures: [],
      geographicReach: ['Kerala'],
      yearlyGrowth: 18.4
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['Government Certified'],
      transparencyScore: 86,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2001-02-18'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '5',
    name: 'CRY - Child Rights and You',
    registrationNumber: 'REG-1979-CRY-005',
    type: 'NGO',
    category: 'Child Welfare',
    trustScore: 91,
    trustTrend: [88, 89, 90, 91, 91],
    description: 'Leading NGO focused on child rights and welfare in India',
    website: 'https://www.cry.org',
    email: 'info@crymail.org',
    phone: '+91-22-2653-3838',
    address: 'Mumbai, Maharashtra',
    projects: [],
    totalFundsReceived: 320000000,
    totalFundsDisbursed: 305000000,
    verificationStatus: 'verified',
    donationEnabled: true,
    donationMethods: [
      { id: 'upi-5', type: 'upi', name: 'UPI Payment', details: {}, enabled: true },
      { id: 'card-5', type: 'card', name: 'Credit/Debit Card', details: {}, enabled: true },
      { id: 'crypto-5', type: 'crypto', name: 'Cryptocurrency', details: {}, enabled: true }
    ],
    impact: {
      beneficiariesReached: 665000,
      projectsCompleted: 234,
      fundUtilizationRate: 95.3,
      impactScore: 91,
      outcomeMeasures: [],
      geographicReach: ['Mumbai', 'Delhi', 'Kolkata', 'Bangalore', 'Hyderabad', 'Odisha'],
      yearlyGrowth: 9.7
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['80G Certificate', 'FCRA License'],
      transparencyScore: 91,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('1979-04-10'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '6',
    name: 'Bharti Foundation',
    registrationNumber: 'REG-2000-BF-006',
    type: 'Private',
    category: 'Education',
    trustScore: 87,
    trustTrend: [83, 85, 86, 87, 87],
    description: 'Corporate foundation focused on education and rural development',
    website: 'https://www.bhartifoundation.org',
    email: 'info@bhartifoundation.org',
    phone: '+91-124-466-6100',
    address: 'Gurgaon, Haryana',
    projects: [],
    totalFundsReceived: 180000000,
    totalFundsDisbursed: 170000000,
    verificationStatus: 'verified',
    donationEnabled: true,
    donationMethods: [
      { id: 'upi-6', type: 'upi', name: 'UPI Payment', details: {}, enabled: true },
      { id: 'card-6', type: 'card', name: 'Credit/Debit Card', details: {}, enabled: true }
    ],
    impact: {
      beneficiariesReached: 150000,
      projectsCompleted: 89,
      fundUtilizationRate: 94.4,
      impactScore: 87,
      outcomeMeasures: [],
      geographicReach: ['Haryana', 'Punjab', 'Rajasthan'],
      yearlyGrowth: 8.2
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['80G Certificate'],
      transparencyScore: 87,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2000-07-12'),
    updatedAt: new Date('2024-12-11')
  },
  // Digital Financial Services
  {
    id: '7',
    name: 'Paytm',
    registrationNumber: 'DFS-2010-PTM-007',
    type: 'Digital_Financial_Service',
    category: 'Fintech',
    trustScore: 81,
    trustTrend: [78, 79, 80, 81, 81],
    description: 'Leading digital payments and financial services platform in India',
    website: 'https://paytm.com',
    email: 'support@paytm.com',
    phone: '+91-120-4770-770',
    address: 'Noida, Uttar Pradesh',
    logo: '/images/paytm-logo.png',
    projects: [],
    totalFundsReceived: 2500000000,
    totalFundsDisbursed: 2300000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    features: [
      {
        id: 'f1',
        name: 'Digital Wallet',
        description: 'Store money digitally and make payments',
        type: 'payment',
        isActive: true,
        pricing: [
          { tier: 'Basic', price: 0, currency: 'INR', features: ['Store up to ₹10,000', 'Basic payments'] },
          { tier: 'KYC', price: 0, currency: 'INR', features: ['Store up to ₹1,00,000', 'All payment features'] }
        ]
      },
      {
        id: 'f2',
        name: 'UPI Payments',
        description: 'Instant bank-to-bank transfers',
        type: 'payment',
        isActive: true
      },
      {
        id: 'f3',
        name: 'Loan Services',
        description: 'Personal and business loans',
        type: 'lending',
        isActive: true
      }
    ],
    impact: {
      beneficiariesReached: 350000000,
      projectsCompleted: 0,
      fundUtilizationRate: 92.0,
      impactScore: 81,
      outcomeMeasures: [
        { metric: 'Daily Transactions', value: 50000000, unit: 'transactions', category: 'Digital Payments', reportingDate: new Date('2024-12-01') }
      ],
      geographicReach: ['Pan-India'],
      yearlyGrowth: 25.3
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['RBI License', 'PCI DSS'],
      transparencyScore: 81,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2010-08-15'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '8',
    name: 'PhonePe',
    registrationNumber: 'DFS-2015-PPE-008',
    type: 'Digital_Financial_Service',
    category: 'Fintech',
    trustScore: 84,
    trustTrend: [80, 82, 83, 84, 84],
    description: 'Digital payments app with comprehensive financial services',
    website: 'https://phonepe.com',
    email: 'support@phonepe.com',
    phone: '+91-80-4040-2020',
    address: 'Bangalore, Karnataka',
    projects: [],
    totalFundsReceived: 1800000000,
    totalFundsDisbursed: 1650000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    features: [
      {
        id: 'f4',
        name: 'UPI Payments',
        description: 'Instant money transfers and payments',
        type: 'payment',
        isActive: true
      },
      {
        id: 'f5',
        name: 'Insurance',
        description: 'Various insurance products',
        type: 'insurance',
        isActive: true
      }
    ],
    impact: {
      beneficiariesReached: 450000000,
      projectsCompleted: 0,
      fundUtilizationRate: 91.7,
      impactScore: 84,
      outcomeMeasures: [],
      geographicReach: ['Pan-India'],
      yearlyGrowth: 30.1
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['RBI License'],
      transparencyScore: 84,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('2015-12-15'),
    updatedAt: new Date('2024-12-11')
  },
  // Public Services
  {
    id: '9',
    name: 'ESIC - Employee State Insurance Corporation',
    registrationNumber: 'PS-1948-ESIC-009',
    type: 'Public_Service',
    category: 'Healthcare',
    trustScore: 79,
    trustTrend: [75, 76, 77, 78, 79],
    description: 'Social security and health insurance scheme for Indian workers',
    website: 'https://esic.nic.in',
    email: 'info@esic.nic.in',
    phone: '+91-11-2362-0185',
    address: 'New Delhi',
    projects: [],
    totalFundsReceived: 50000000000,
    totalFundsDisbursed: 45000000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    services: [
      {
        id: 's1',
        name: 'Medical Benefits',
        description: 'Free medical care for insured persons and their dependents',
        category: 'healthcare',
        isOnline: true,
        serviceUrl: 'https://esic.nic.in/medical-benefits',
        requiredDocuments: ['ESI Card', 'Medical prescription'],
        processingTime: 'Immediate',
        fees: [],
        eligibility: ['ESI registered employees', 'Dependents of insured persons'],
        contactInfo: { phone: '1800-123-4567' }
      },
      {
        id: 's2',
        name: 'Cash Benefits',
        description: 'Monetary benefits during sickness, maternity, disability',
        category: 'healthcare',
        isOnline: true,
        requiredDocuments: ['ESI Card', 'Medical certificate', 'Bank details'],
        processingTime: '15-30 days',
        fees: [],
        eligibility: ['ESI registered employees'],
        contactInfo: { phone: '1800-123-4567' }
      }
    ],
    impact: {
      beneficiariesReached: 35000000,
      projectsCompleted: 0,
      fundUtilizationRate: 90.0,
      impactScore: 79,
      outcomeMeasures: [],
      geographicReach: ['Pan-India'],
      yearlyGrowth: 5.8
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['Government Certified'],
      transparencyScore: 79,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('1948-04-24'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '10',
    name: 'Income Tax Department',
    registrationNumber: 'PS-1860-ITD-010',
    type: 'Public_Service',
    category: 'Administrative',
    trustScore: 76,
    trustTrend: [72, 74, 75, 76, 76],
    description: 'Central Direct Tax administration under Ministry of Finance',
    website: 'https://incometaxindia.gov.in',
    email: 'info@incometax.gov.in',
    phone: '+91-11-2462-0197',
    address: 'New Delhi',
    projects: [],
    totalFundsReceived: 25000000000,
    totalFundsDisbursed: 22000000000,
    verificationStatus: 'verified',
    donationEnabled: false,
    donationMethods: [],
    services: [
      {
        id: 's3',
        name: 'Income Tax Return Filing',
        description: 'Online filing of income tax returns',
        category: 'administrative',
        isOnline: true,
        serviceUrl: 'https://eportal.incometax.gov.in',
        requiredDocuments: ['PAN Card', 'Form 16', 'Bank statements'],
        processingTime: '24-48 hours for processing',
        fees: [],
        eligibility: ['All taxpayers'],
        contactInfo: { phone: '1800-103-0025' }
      }
    ],
    impact: {
      beneficiariesReached: 75000000,
      projectsCompleted: 0,
      fundUtilizationRate: 88.0,
      impactScore: 76,
      outcomeMeasures: [],
      geographicReach: ['Pan-India'],
      yearlyGrowth: 3.2
    },
    financialTransparency: {
      auditReports: [],
      monthlyReports: [],
      certifications: ['Government Certified'],
      transparencyScore: 76,
      lastAuditDate: new Date('2024-03-31'),
      nextAuditDate: new Date('2025-03-31')
    },
    createdAt: new Date('1860-04-01'),
    updatedAt: new Date('2024-12-11')
  }
];

// Ensure at least 100 organizations by generating additional mock entries
(() => {
  const targetCount = 120; // generate a bit more than 100 for variety
  if (mockOrganizations.length >= targetCount) return;

  const cities = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Ahmedabad, Gujarat', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Indore, Madhya Pradesh', 'Bhopal, Madhya Pradesh',
    'Patna, Bihar', 'Surat, Gujarat', 'Nagpur, Maharashtra', 'Vadodara, Gujarat', 'Nashik, Maharashtra',
    'Thiruvananthapuram, Kerala', 'Kochi, Kerala', 'Visakhapatnam, Andhra Pradesh'
  ];

  const categories = ['Education', 'Healthcare', 'Environment', 'Child Welfare', 'Rural Development', 'Technology'];
  const orgTypes: Organization['type'][] = ['NGO', 'Government', 'Private'];

  const randomPick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const randBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const startId = mockOrganizations.length + 1;
  for (let i = startId; i <= targetCount; i++) {
    const type = randomPick(orgTypes);
    const category = randomPick(categories);
    const city = randomPick(cities);
    const trust = randBetween(70, 98);
    const received = randBetween(5, 500) * 1000000; // ₹5M - ₹500M
    const disbursed = Math.floor(received * (0.7 + Math.random() * 0.28)); // 70% - 98%
    const utilization = Math.min(99.5, (disbursed / received) * 100);
    const donationEnabled = type !== 'Government' && type !== 'Public_Service' && Math.random() > 0.3;

    const donationMethods: DonationMethod[] = donationEnabled ? [
      { id: `upi-${i}`, type: 'upi', name: 'UPI Payment', details: {}, enabled: true },
      { id: `card-${i}`, type: 'card', name: 'Credit/Debit Card', details: {}, enabled: true }
    ] : [];

    const now = new Date();
    const created = new Date(now.getFullYear() - randBetween(1, 20), randBetween(0, 11), randBetween(1, 28));

    const org: Organization = {
      id: String(i),
      name: type === 'NGO' ? `NGO Hope ${i}` : type === 'Private' ? `Corporate Foundation ${i}` : `Dept. of ${category} ${i}`,
      registrationNumber: `${type.slice(0,3).toUpperCase()}-${created.getFullYear()}-${i.toString().padStart(3,'0')}`,
      type,
      category,
      trustScore: trust,
      trustTrend: [trust - 4, trust - 2, trust - 1, trust, trust],
      description: `An ${type.replace('_', ' ')} working in ${category.toLowerCase()} based in ${city.split(',')[0]}.`,
      website: undefined,
      email: `contact${i}@example.org`,
      phone: `+91-9${randBetween(100000000, 999999999)}`,
      address: city,
      logo: undefined,
      banner: undefined,
      projects: [],
      totalFundsReceived: received,
      totalFundsDisbursed: disbursed,
      verificationStatus: 'verified',
      donationEnabled,
      donationMethods,
      socialLinks: undefined,
      features: undefined,
      services: undefined,
      impact: {
        beneficiariesReached: randBetween(1000, 2000000),
        projectsCompleted: randBetween(5, 300),
        fundUtilizationRate: parseFloat(utilization.toFixed(1)),
        impactScore: trust,
        outcomeMeasures: [],
        geographicReach: [city.split(',')[1]?.trim() || 'India'],
        yearlyGrowth: parseFloat((Math.random() * 20).toFixed(1))
      },
      financialTransparency: {
        auditReports: [],
        monthlyReports: [],
        certifications: [],
        transparencyScore: trust,
        lastAuditDate: created,
        nextAuditDate: new Date(created.getFullYear() + 1, created.getMonth(), created.getDate())
      },
      createdAt: created,
      updatedAt: now
    };

    mockOrganizations.push(org);
  }
})();

// Mock Welfare Schemes
export const mockWelfareSchemes: WelfareScheme[] = [
  {
    id: 'scheme-1',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    department: 'Ministry of Agriculture and Farmers Welfare',
    description: 'Direct income support scheme for small and marginal farmers',
    eligibilityCriteria: [
      'Small and marginal farmers with landholding up to 2 hectares',
      'Valid Aadhaar card',
      'Bank account details'
    ],
    benefits: [
      '₹6,000 per year in three equal installments',
      'Direct benefit transfer to bank account'
    ],
    applicationProcess: [
      'Visit PM-KISAN portal',
      'Register with Aadhaar and bank details',
      'Submit land records',
      'Verification by local authorities'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land Records',
      'Mobile Number'
    ],
    contactInfo: {
      email: 'pmkisan-ict@gov.in',
      phone: '155261',
      website: 'https://pmkisan.gov.in'
    },
    isActive: true,
    budget: {
      allocated: 600000000000, // ₹60,000 crores
      disbursed: 540000000000,
      beneficiaries: 120000000
    },
    createdAt: new Date('2019-02-01'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: 'scheme-2',
    name: 'Ayushman Bharat - PM-JAY',
    department: 'Ministry of Health and Family Welfare',
    description: 'Health insurance scheme providing coverage up to ₹5 lakh per family per year',
    eligibilityCriteria: [
      'Listed in SECC database',
      'Eligible family as per deprivation criteria',
      'Valid Aadhaar card'
    ],
    benefits: [
      'Health cover up to ₹5 lakh per family per year',
      'Covers secondary and tertiary care',
      'Cashless and paperless treatment'
    ],
    applicationProcess: [
      'Check eligibility on PM-JAY website',
      'Visit nearest Common Service Centre',
      'Generate e-card',
      'Use at empanelled hospitals'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'SECC Family ID',
      'Mobile Number'
    ],
    contactInfo: {
      email: 'info@pmjay.gov.in',
      phone: '14555',
      website: 'https://pmjay.gov.in'
    },
    isActive: true,
    budget: {
      allocated: 64000000000, // ₹6,400 crores
      disbursed: 58000000000,
      beneficiaries: 50000000
    },
    createdAt: new Date('2018-09-23'),
    updatedAt: new Date('2024-12-11')
  }
];

// Search functionality
export interface SearchResult {
  organizations: Organization[];
  schemes: WelfareScheme[];
  total: number;
}

// In-memory + persisted donation store for demo
type DonationRecord = {
  donation: import('../types').Donation;
  usage: Array<{ id: string; description: string; amount: number; category: string; date: Date; project?: string }>;
};

const DONATION_STORE_KEY = 'fundflow_donation_store_v1';

let donationStore: Record<string, DonationRecord> = {};

const reviveDonationRecord = (raw: any): DonationRecord => {
  return {
    donation: {
      ...raw.donation,
      createdAt: new Date(raw.donation.createdAt),
      completedAt: raw.donation.completedAt ? new Date(raw.donation.completedAt) : undefined,
      nextDonationDate: raw.donation.nextDonationDate ? new Date(raw.donation.nextDonationDate) : undefined
    },
    usage: (raw.usage || []).map((u: any) => ({
      ...u,
      date: new Date(u.date)
    }))
  } as DonationRecord;
};

const loadDonationStore = () => {
  try {
    const json = typeof window !== 'undefined' ? window.localStorage.getItem(DONATION_STORE_KEY) : null;
    if (!json) return;
    const parsed = JSON.parse(json);
    const restored: Record<string, DonationRecord> = {};
    Object.keys(parsed).forEach((key) => {
      restored[key] = reviveDonationRecord(parsed[key]);
    });
    donationStore = restored;
  } catch (err) {
    // Fallback to empty in case of corruption
    donationStore = {};
  }
};

const saveDonationStore = () => {
  try {
    if (typeof window === 'undefined') return;
    // Serialize with dates as ISO strings
    const serializable: any = {};
    Object.keys(donationStore).forEach((key) => {
      const rec = donationStore[key];
      serializable[key] = {
        donation: {
          ...rec.donation,
          createdAt: rec.donation.createdAt?.toISOString?.() || rec.donation.createdAt,
          completedAt: rec.donation.completedAt ? rec.donation.completedAt.toISOString() : undefined,
          nextDonationDate: rec.donation.nextDonationDate ? rec.donation.nextDonationDate.toISOString() : undefined
        },
        usage: rec.usage.map(u => ({
          ...u,
          date: u.date instanceof Date ? u.date.toISOString() : u.date
        }))
      };
    });
    window.localStorage.setItem(DONATION_STORE_KEY, JSON.stringify(serializable));
  } catch (_) {
    // ignore persistence errors
  }
};

// Initialize from localStorage on module load (browser only)
if (typeof window !== 'undefined') {
  loadDonationStore();
}

const generateFundId = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = 'FUND-';
  for (let i = 0; i < 10; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
};

export const createDonation = async (input: {
  organizationId: string;
  amount: number;
  method: DonationMethod;
  donorDetails: { name?: string; email?: string; phone?: string; message?: string; isAnonymous?: boolean; wantsTaxBenefit?: boolean; recurringType?: 'monthly' | 'quarterly' | 'yearly' | '' };
}): Promise<import('../types').Donation> => {
  await new Promise(r => setTimeout(r, 500));
  const fundId = generateFundId();
  const now = new Date();
  const donation: import('../types').Donation = {
    id: 'donation-' + now.getTime(),
    donorId: undefined,
    organizationId: input.organizationId,
    projectId: undefined,
    amount: input.amount,
    currency: 'INR',
    method: input.method,
    status: 'completed',
    message: input.donorDetails.message,
    isAnonymous: !!input.donorDetails.isAnonymous,
    recurringType: (input.donorDetails.recurringType as any) || undefined,
    nextDonationDate: undefined,
    receiptId: 'RCP-' + now.getTime(),
    taxBenefit: !!input.donorDetails.wantsTaxBenefit,
    transactionHash: undefined,
    fundId,
    createdAt: now,
    completedAt: now
  };

  // Seed a simple usage breakdown for demo
  const org = mockOrganizations.find(o => o.id === input.organizationId)!;
  const buckets = [
    { category: 'Program Implementation', pct: 0.6 },
    { category: 'Administrative Costs', pct: 0.15 },
    { category: 'Monitoring & Evaluation', pct: 0.1 },
    { category: 'Capacity Building', pct: 0.1 },
    { category: 'Emergency Reserve', pct: 0.05 }
  ];
  const usage = buckets.map((b, idx) => ({
    id: `${fundId}-${idx+1}`,
    description: `${b.category} for ${org.name}`,
    amount: Math.round(input.amount * b.pct),
    category: b.category,
    date: new Date(now.getTime() + idx * 86400000),
    project: undefined
  }));

  // Ensure store is loaded (no-op if already)
  if (typeof window !== 'undefined' && Object.keys(donationStore).length === 0) {
    loadDonationStore();
  }

  donationStore[fundId] = { donation, usage };
  saveDonationStore();
  return donation;
};

export const getDonationByFundId = async (fundId: string): Promise<DonationRecord | null> => {
  await new Promise(r => setTimeout(r, 300));
  // Reload latest from storage to catch donations created in previous sessions
  if (typeof window !== 'undefined') {
    loadDonationStore();
  }
  return donationStore[fundId] || null;
};

export const searchData = (query: string, filters: SearchFilters = {}): Promise<SearchResult> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let filteredOrganizations = [...mockOrganizations];
      let filteredSchemes = [...mockWelfareSchemes];

      // Filter by search query
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        
        filteredOrganizations = filteredOrganizations.filter(org =>
          org.name.toLowerCase().includes(searchTerm) ||
          org.description.toLowerCase().includes(searchTerm) ||
          org.address.toLowerCase().includes(searchTerm) ||
          org.type.toLowerCase().includes(searchTerm)
        );

        filteredSchemes = filteredSchemes.filter(scheme =>
          scheme.name.toLowerCase().includes(searchTerm) ||
          scheme.description.toLowerCase().includes(searchTerm) ||
          scheme.department.toLowerCase().includes(searchTerm)
        );
      }

      // Apply filters
      if (filters.type) {
        if (filters.type === 'organization') {
          filteredSchemes = [];
        } else if (filters.type === 'scheme') {
          filteredOrganizations = [];
        }
      }

      if (filters.trustScoreMin !== undefined) {
        filteredOrganizations = filteredOrganizations.filter(org => 
          org.trustScore >= filters.trustScoreMin!
        );
      }

      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        filteredOrganizations = filteredOrganizations.filter(org =>
          org.address.toLowerCase().includes(locationTerm)
        );
      }

      const result: SearchResult = {
        organizations: filteredOrganizations,
        schemes: filteredSchemes,
        total: filteredOrganizations.length + filteredSchemes.length
      };

      resolve(result);
    }, 300); // Simulate network delay
  });
};

export const getOrganizationById = (id: string): Promise<Organization | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const organization = mockOrganizations.find(org => org.id === id);
      resolve(organization || null);
    }, 200);
  });
};

// Fund tracking data for organizations
export const getFundTrackingData = (organizationId: string): Promise<FundTrackingData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const organization = mockOrganizations.find(org => org.id === organizationId);
      if (!organization) {
        resolve(null);
        return;
      }

      // Generate mock fund tracking data based on organization
      const fundData: FundTrackingData = {
        organizationId,
        totalReceived: organization.totalFundsReceived,
        totalSpent: organization.totalFundsDisbursed,
        totalPending: organization.totalFundsReceived - organization.totalFundsDisbursed,
        categories: generateCategoriesForOrganization(organization),
        monthlyData: generateMonthlyDataForOrganization(organization),
        efficiency: organization.impact.fundUtilizationRate,
        alerts: generateAlertsForOrganization(organization)
      };
      
      resolve(fundData);
    }, 300);
  });
};

const generateCategoriesForOrganization = (org: Organization) => {
  const baseCategories = {
    'NGO': [
      { name: 'Program Implementation', allocated: 0.6, color: '#3b82f6' },
      { name: 'Administrative Costs', allocated: 0.15, color: '#ef4444' },
      { name: 'Fundraising', allocated: 0.10, color: '#f59e0b' },
      { name: 'Capacity Building', allocated: 0.10, color: '#10b981' },
      { name: 'Emergency Reserve', allocated: 0.05, color: '#8b5cf6' }
    ],
    'Government': [
      { name: 'Scheme Implementation', allocated: 0.65, color: '#3b82f6' },
      { name: 'Infrastructure', allocated: 0.20, color: '#10b981' },
      { name: 'Administrative Costs', allocated: 0.10, color: '#ef4444' },
      { name: 'Monitoring & Evaluation', allocated: 0.05, color: '#f59e0b' }
    ],
    'Private': [
      { name: 'CSR Programs', allocated: 0.70, color: '#3b82f6' },
      { name: 'Community Engagement', allocated: 0.15, color: '#10b981' },
      { name: 'Administrative Costs', allocated: 0.10, color: '#ef4444' },
      { name: 'Impact Measurement', allocated: 0.05, color: '#f59e0b' }
    ],
    'Digital_Financial_Service': [
      { name: 'Technology Development', allocated: 0.40, color: '#3b82f6' },
      { name: 'Operations', allocated: 0.30, color: '#10b981' },
      { name: 'Customer Acquisition', allocated: 0.15, color: '#f59e0b' },
      { name: 'Compliance & Security', allocated: 0.10, color: '#ef4444' },
      { name: 'Administrative Costs', allocated: 0.05, color: '#8b5cf6' }
    ],
    'Public_Service': [
      { name: 'Service Delivery', allocated: 0.60, color: '#3b82f6' },
      { name: 'Infrastructure Maintenance', allocated: 0.20, color: '#10b981' },
      { name: 'Staff & Training', allocated: 0.15, color: '#f59e0b' },
      { name: 'Administrative Costs', allocated: 0.05, color: '#ef4444' }
    ]
  };

  const categories = baseCategories[org.type as keyof typeof baseCategories] || baseCategories['NGO'];
  
  return categories.map(cat => {
    const allocated = org.totalFundsReceived * cat.allocated;
    const efficiency = 85 + Math.random() * 15; // 85-100% efficiency
    const spent = allocated * (efficiency / 100);
    const pending = allocated - spent;
    
    return {
      name: cat.name,
      allocated,
      spent,
      pending,
      efficiency,
      color: cat.color
    };
  });
};

const generateMonthlyDataForOrganization = (org: Organization) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseMonthly = org.totalFundsReceived / 12;
  
  return months.map(month => {
    const variation = 0.7 + Math.random() * 0.6; // 70% to 130% of base
    const received = baseMonthly * variation;
    const spent = received * 0.9; // 90% utilization rate
    const balance = received - spent;
    
    return {
      month,
      received,
      spent,
      balance
    };
  });
};

const generateAlertsForOrganization = (org: Organization) => {
  const alerts = [];
  
  // Generate alerts based on efficiency
  if (org.impact.fundUtilizationRate < 85) {
    alerts.push({
      id: 'alert-1',
      type: 'low_efficiency' as const,
      severity: 'medium' as const,
      message: `Fund utilization efficiency is ${org.impact.fundUtilizationRate.toFixed(1)}%, below target of 85%`,
      data: { efficiency: org.impact.fundUtilizationRate },
      createdAt: new Date(),
      resolved: false
    });
  }
  
  // Generate budget alerts for high spenders
  if (org.totalFundsDisbursed > org.totalFundsReceived * 0.95) {
    alerts.push({
      id: 'alert-2',
      type: 'budget_overrun' as const,
      severity: 'high' as const,
      message: 'Organization has spent more than 95% of received funds',
      data: { utilizationRate: (org.totalFundsDisbursed / org.totalFundsReceived) * 100 },
      createdAt: new Date(),
      resolved: false
    });
  }
  
  return alerts;
};

// Enhanced search with organization type filtering
export const searchOrganizations = (query: string, filters: SearchFilters & { organizationType?: string } = {}): Promise<SearchResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredOrganizations = [...mockOrganizations];
      let filteredSchemes = [...mockWelfareSchemes];

      // Filter by search query
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        
        filteredOrganizations = filteredOrganizations.filter(org =>
          org.name.toLowerCase().includes(searchTerm) ||
          org.description.toLowerCase().includes(searchTerm) ||
          org.address.toLowerCase().includes(searchTerm) ||
          org.type.toLowerCase().includes(searchTerm) ||
          org.category.toLowerCase().includes(searchTerm)
        );

        filteredSchemes = filteredSchemes.filter(scheme =>
          scheme.name.toLowerCase().includes(searchTerm) ||
          scheme.description.toLowerCase().includes(searchTerm) ||
          scheme.department.toLowerCase().includes(searchTerm)
        );
      }

      // Apply organization type filter
      if (filters.organizationType) {
        filteredOrganizations = filteredOrganizations.filter(org => 
          org.type === filters.organizationType
        );
      }

      // Apply existing filters
      if (filters.type) {
        if (filters.type === 'organization') {
          filteredSchemes = [];
        } else if (filters.type === 'scheme') {
          filteredOrganizations = [];
        }
      }

      if (filters.trustScoreMin !== undefined) {
        filteredOrganizations = filteredOrganizations.filter(org => 
          org.trustScore >= filters.trustScoreMin!
        );
      }

      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        filteredOrganizations = filteredOrganizations.filter(org =>
          org.address.toLowerCase().includes(locationTerm)
        );
      }

      const result: SearchResult = {
        organizations: filteredOrganizations,
        schemes: filteredSchemes,
        total: filteredOrganizations.length + filteredSchemes.length
      };

      resolve(result);
    }, 300);
  });
};
