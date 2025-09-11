const express = require('express');
const router = express.Router();

// Mock data - would be replaced with database queries
const mockOrganizations = [
  {
    id: '1',
    name: 'Akshaya Patra Foundation',
    registrationNumber: 'REG-2001-APF-001',
    type: 'NGO',
    trustScore: 94,
    trustTrend: [89, 91, 92, 94, 94],
    description: 'Largest NGO in India providing mid-day meals to school children',
    website: 'https://akshayapatra.org',
    email: 'info@akshayapatra.org',
    phone: '+91-80-3021-4444',
    address: 'Bangalore, Karnataka, India',
    totalFundsReceived: 450000000,
    totalFundsDisbursed: 420000000,
    verificationStatus: 'verified',
    createdAt: new Date('2001-06-15'),
    updatedAt: new Date('2024-12-11')
  },
  {
    id: '2',
    name: 'Ministry of Rural Development',
    registrationNumber: 'GOI-MRD-2014',
    type: 'Government',
    trustScore: 82,
    trustTrend: [78, 79, 80, 81, 82],
    description: 'Government ministry overseeing rural development schemes',
    website: 'https://rural.nic.in',
    email: 'info@rural.nic.in',
    phone: '+91-11-2338-2045',
    address: 'New Delhi, India',
    totalFundsReceived: 1200000000,
    totalFundsDisbursed: 980000000,
    verificationStatus: 'verified',
    createdAt: new Date('2014-05-26'),
    updatedAt: new Date('2024-12-11')
  }
];

// GET /api/organizations - Get all organizations with optional filters
router.get('/', (req, res) => {
  try {
    const { type, trustScoreMin, location, limit = 50, offset = 0 } = req.query;
    
    let filteredOrgs = [...mockOrganizations];
    
    // Apply filters
    if (type) {
      filteredOrgs = filteredOrgs.filter(org => 
        org.type.toLowerCase() === type.toLowerCase()
      );
    }
    
    if (trustScoreMin) {
      filteredOrgs = filteredOrgs.filter(org => 
        org.trustScore >= parseInt(trustScoreMin)
      );
    }
    
    if (location) {
      filteredOrgs = filteredOrgs.filter(org =>
        org.address.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrgs = filteredOrgs.slice(startIndex, endIndex);
    
    res.json({
      organizations: paginatedOrgs,
      total: filteredOrgs.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/organizations/:id - Get specific organization
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const organization = mockOrganizations.find(org => org.id === id);
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/organizations/:id/projects - Get projects for an organization
router.get('/:id/projects', (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock project data for the organization
    const mockProjects = [
      {
        id: 'proj-1',
        organizationId: id,
        name: 'Mid-Day Meal Program - Karnataka',
        description: 'Providing nutritious meals to 180,000 children daily',
        category: 'Education & Nutrition',
        status: 'active',
        budget: {
          allocated: 50000000,
          used: 45000000,
          remaining: 5000000
        },
        timeline: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          milestones: []
        },
        location: {
          address: 'Karnataka, India'
        },
        beneficiaries: 180000
      }
    ];
    
    res.json({
      projects: mockProjects,
      total: mockProjects.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/organizations/:id/trust-score - Get trust score details
router.get('/:id/trust-score', (req, res) => {
  try {
    const { id } = req.params;
    const organization = mockOrganizations.find(org => org.id === id);
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    
    const trustScoreDetails = {
      current: organization.trustScore,
      trend: organization.trustTrend,
      factors: {
        transparency: 92,
        efficiency: 88,
        compliance: 96,
        communityFeedback: 89,
        financialHealth: 95
      },
      lastUpdated: new Date(),
      analysis: {
        strengths: [
          'High transparency in fund utilization',
          'Excellent compliance record',
          'Strong community feedback'
        ],
        improvements: [
          'Can improve operational efficiency',
          'Enhance real-time reporting'
        ]
      }
    };
    
    res.json(trustScoreDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/organizations/featured - Get featured high-trust organizations
router.get('/featured/list', (req, res) => {
  try {
    const featuredOrgs = mockOrganizations
      .filter(org => org.trustScore >= 80)
      .sort((a, b) => b.trustScore - a.trustScore)
      .slice(0, 6);
    
    res.json({
      organizations: featuredOrgs,
      total: featuredOrgs.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
