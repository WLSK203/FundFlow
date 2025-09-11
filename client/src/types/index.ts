export interface Organization {
  id: string;
  name: string;
  registrationNumber: string;
  type: 'NGO' | 'Government' | 'Private';
  trustScore: number;
  trustTrend: number[];
  description: string;
  website?: string;
  email: string;
  phone: string;
  address: string;
  projects: Project[];
  totalFundsReceived: number;
  totalFundsDisbursed: number;
  verificationStatus: 'verified' | 'pending' | 'unverified';
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
