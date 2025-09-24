export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  type: 'NGO' | 'Government' | 'Private' | 'Digital_Financial_Service' | 'Public_Service';
  category: string; // e.g., 'Education', 'Healthcare', 'Environment', 'Fintech', 'Banking', 'Insurance'
  trustScore: number;
  trustTrend: number[];
  description: string;
  website?: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  banner?: string;
  projects: Project[];
  totalFundsReceived: number;
  totalFundsDisbursed: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  donationEnabled: boolean;
  donationMethods: DonationMethod[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  features?: OrganizationFeature[]; // For Digital Financial Services
  services?: PublicService[]; // For Public Services
  impact: ImpactMetrics;
  financialTransparency: FinancialTransparency;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  budget: {
    allocated: number;
    used: number;
    remaining: number;
  };
  timeline: {
    startDate: Date;
    endDate: Date;
    milestones: Milestone[];
  };
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  beneficiaries: number;
  transactions: Transaction[];
  audits: CommunityAudit[];
  aiAgent?: TransparentAIAgent;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  projectId: string;
  blockchainHash: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  from: string;
  to: string;
  description: string;
  category: string;
  timestamp: Date;
  verified: boolean;
  zkProofHash?: string;
}

export interface CommunityAudit {
  id: string;
  projectId: string;
  userId: string;
  type: 'photo' | 'report' | 'complaint';
  title: string;
  description: string;
  media?: {
    url: string;
    type: 'image' | 'video';
    geoTag?: {
      lat: number;
      lng: number;
      timestamp: Date;
    };
  };
  status: 'pending' | 'verified' | 'rejected';
  votes: {
    upvotes: number;
    downvotes: number;
  };
  createdAt: Date;
  verifiedAt?: Date;
}

export interface TransparentAIAgent {
  id: string;
  projectId: string;
  name: string;
  status: 'active' | 'inactive';
  alerts: AIAlert[];
  monitoring: {
    budgetAdherence: number;
    vendorCompliance: number;
    timelineCompliance: number;
    anomalyScore: number;
  };
  lastAnalysis: Date;
}

export interface AIAlert {
  id: string;
  agentId: string;
  type: 'budget_deviation' | 'suspicious_transaction' | 'timeline_delay' | 'vendor_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  data: any;
  resolved: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface TrustScore {
  current: number;
  trend: number[];
  factors: {
    transparency: number;
    efficiency: number;
    compliance: number;
    communityFeedback: number;
    financialHealth: number;
  };
  lastUpdated: Date;
}

export interface WelfareScheme {
  id: string;
  name: string;
  department: string;
  description: string;
  eligibilityCriteria: string[];
  benefits: string[];
  applicationProcess: string[];
  requiredDocuments: string[];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  isActive: boolean;
  budget: {
    allocated: number;
    disbursed: number;
    beneficiaries: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'organization_admin' | 'government_official' | 'auditor';
  verificationLevel: 'basic' | 'verified' | 'premium';
  gamification: {
    points: number;
    badges: Badge[];
    level: number;
    contributions: number;
  };
  preferences: {
    notifications: boolean;
    publicProfile: boolean;
  };
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  budget: number;
}

export interface SearchFilters {
  type?: 'organization' | 'project' | 'scheme';
  category?: string;
  location?: string;
  trustScoreMin?: number;
  trustScoreMax?: number;
  budgetMin?: number;
  budgetMax?: number;
  status?: string;
}

export interface DashboardStats {
  totalOrganizations: number;
  totalProjects: number;
  totalFundsTracked: number;
  averageTrustScore: number;
  activeAudits: number;
  resolvedIssues: number;
}

// New interfaces for enhanced features
export interface DonationMethod {
  id: string;
  type: 'upi' | 'card' | 'netbanking' | 'wallet' | 'crypto';
  name: string;
  details: any; // Payment gateway specific details
  enabled: boolean;
  processingFee?: number;
}

export interface Donation {
  id: string;
  donorId?: string; // Optional for anonymous donations
  organizationId: string;
  projectId?: string; // Optional - can donate to specific project
  amount: number;
  currency: string;
  method: DonationMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  message?: string; // Donor message
  isAnonymous: boolean;
  recurringType?: 'monthly' | 'quarterly' | 'yearly';
  nextDonationDate?: Date;
  receiptId: string;
  taxBenefit: boolean;
  transactionHash?: string; // For blockchain transactions
  fundId: string; // New: trackable Fund ID
  createdAt: Date;
  completedAt?: Date;
}

export interface ImpactMetrics {
  beneficiariesReached: number;
  projectsCompleted: number;
  fundUtilizationRate: number; // Percentage
  impactScore: number; // 0-100
  outcomeMeasures: OutcomeMeasure[];
  geographicReach: string[]; // List of locations
  yearlyGrowth: number; // Percentage
}

export interface OutcomeMeasure {
  metric: string;
  value: number;
  unit: string;
  category: string;
  reportingDate: Date;
}

export interface FinancialTransparency {
  auditReports: AuditReport[];
  monthlyReports: MonthlyFinancialReport[];
  certifications: string[];
  transparencyScore: number; // 0-100
  lastAuditDate: Date;
  nextAuditDate: Date;
}

export interface AuditReport {
  id: string;
  auditorName: string;
  reportUrl: string;
  reportDate: Date;
  findings: string[];
  recommendations: string[];
  compliance: boolean;
}

export interface MonthlyFinancialReport {
  month: string;
  year: number;
  income: number;
  expenditure: number;
  balance: number;
  reportUrl?: string;
}

export interface OrganizationFeature {
  id: string;
  name: string;
  description: string;
  type: 'payment' | 'lending' | 'insurance' | 'investment' | 'remittance' | 'other';
  isActive: boolean;
  pricing?: PricingModel[];
  technicalSpecs?: TechnicalSpecification[];
}

export interface PricingModel {
  tier: string;
  price: number;
  currency: string;
  features: string[];
  limitations?: string[];
}

export interface TechnicalSpecification {
  specification: string;
  value: string;
  category: string;
}

export interface PublicService {
  id: string;
  name: string;
  description: string;
  category: 'healthcare' | 'education' | 'transport' | 'utilities' | 'legal' | 'administrative' | 'other';
  isOnline: boolean;
  serviceUrl?: string;
  requiredDocuments: string[];
  processingTime: string;
  fees: ServiceFee[];
  eligibility: string[];
  contactInfo: ContactInfo;
}

export interface ServiceFee {
  description: string;
  amount: number;
  currency: string;
  isOptional: boolean;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  workingHours?: string;
}

export interface FundTrackingData {
  organizationId: string;
  totalReceived: number;
  totalSpent: number;
  totalPending: number;
  categories: FundCategory[];
  monthlyData: MonthlyFundData[];
  efficiency: number;
  alerts: FundAlert[];
}

export interface FundCategory {
  name: string;
  allocated: number;
  spent: number;
  pending: number;
  efficiency: number;
  color: string;
}

export interface MonthlyFundData {
  month: string;
  received: number;
  spent: number;
  balance: number;
}

export interface FundAlert {
  id: string;
  type: 'budget_overrun' | 'low_efficiency' | 'delayed_disbursement' | 'unusual_spending';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  data: any;
  createdAt: Date;
  resolved: boolean;
}
