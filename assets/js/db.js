/* ============================================
   SYBERVERSE ENTERPRISE NEXUS
   Mock Database Layer
   ============================================ */

// Simulated Database with Relationships
const DB = {
  
  // ==================== USERS ====================
  users: [
    {
      id: 'u001',
      email: 'admin@syberverse.com',
      role: 'admin',
      name: 'System Administrator',
      password_hash: 'hashed_admin_pass', // In production: bcrypt hash
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 'u002',
      email: 'contractor1@buildcorp.com',
      role: 'contractor',
      name: 'BuildCorp Ltd',
      password_hash: 'hashed_contractor1_pass',
      created_at: '2024-02-01T14:30:00Z'
    },
    {
      id: 'u003',
      email: 'contractor2@techinstall.com',
      role: 'contractor',
      name: 'TechInstall Solutions',
      password_hash: 'hashed_contractor2_pass',
      created_at: '2024-02-10T09:15:00Z'
    },
    {
      id: 'u004',
      email: 'client@megacorp.com',
      role: 'client',
      name: 'MegaCorp Industries',
      password_hash: 'hashed_client_pass',
      created_at: '2024-01-20T11:00:00Z'
    }
  ],

  // ==================== CONTRACTORS ====================
  contractors: [
    {
      id: 'c001',
      user_id: 'u002',
      company_name: 'BuildCorp Ltd',
      contact_person: 'John Smith',
      phone: '+44 20 7946 0958',
      vetting_status: 'active', // active | pending | at_risk | expired
      rating: 4.8,
      completed_projects: 12,
      documents: [
        {
          id: 'doc001',
          type: 'Public Liability Insurance',
          expiry: '2026-08-15',
          url: '/uploads/buildcorp_insurance.pdf',
          status: 'approved',
          uploaded_at: '2024-02-01T14:35:00Z'
        },
        {
          id: 'doc002',
          type: 'ISO 9001 Certificate',
          expiry: '2026-12-31',
          url: '/uploads/buildcorp_iso9001.pdf',
          status: 'approved',
          uploaded_at: '2024-02-01T14:40:00Z'
        },
        {
          id: 'doc003',
          type: 'Health & Safety Certificate',
          expiry: '2026-03-20',
          url: '/uploads/buildcorp_health_safety.pdf',
          status: 'approved',
          uploaded_at: '2024-02-01T14:45:00Z'
        }
      ]
    },
    {
      id: 'c002',
      user_id: 'u003',
      company_name: 'TechInstall Solutions',
      contact_person: 'Sarah Johnson',
      phone: '+44 20 7946 0123',
      vetting_status: 'at_risk', // Document expiring soon
      rating: 4.5,
      completed_projects: 8,
      documents: [
        {
          id: 'doc004',
          type: 'Public Liability Insurance',
          expiry: '2026-03-10', // Less than 30 days from now (Feb 13, 2026)
          url: '/uploads/techinstall_insurance.pdf',
          status: 'approved',
          uploaded_at: '2024-02-10T09:20:00Z'
        },
        {
          id: 'doc005',
          type: 'ISO 9001 Certificate',
          expiry: '2026-06-30',
          url: '/uploads/techinstall_iso9001.pdf',
          status: 'approved',
          uploaded_at: '2024-02-10T09:25:00Z'
        }
      ]
    }
  ],

  // ==================== CLIENTS ====================
  clients: [
    {
      id: 'cl001',
      user_id: 'u004',
      company_name: 'MegaCorp Industries',
      contact_person: 'David Williams',
      email: 'client@megacorp.com',
      phone: '+44 20 7946 0777',
      industry: 'Manufacturing',
      active_projects: 2,
      total_spend: 450000,
      created_at: '2024-01-20T11:00:00Z'
    }
  ],

  // ==================== TENDERS ====================
  tenders: [
    {
      id: 't001',
      title: 'Warehouse Automation System Installation',
      description: 'Install automated conveyor system and inventory management hardware across 50,000 sq ft warehouse facility.',
      budget: 250000,
      client_id: 'cl001',
      status: 'open', // open | closed | awarded
      deadline: '2026-03-15T23:59:59Z',
      requirements: [
        'ISO 9001 Certified',
        'Public Liability Insurance (min £5M)',
        'Previous warehouse automation experience',
        'Health & Safety certification'
      ],
      created_at: '2026-02-01T10:00:00Z',
      created_by: 'u001'
    },
    {
      id: 't002',
      title: 'Office Network Infrastructure Upgrade',
      description: 'Complete network cabling and switch installation for 3-floor office building.',
      budget: 75000,
      client_id: 'cl001',
      status: 'closed',
      deadline: '2026-02-28T23:59:59Z',
      requirements: [
        'Network cabling certification',
        'Public Liability Insurance'
      ],
      created_at: '2026-01-15T10:00:00Z',
      created_by: 'u001'
    }
  ],

  // ==================== BIDS ====================
  bids: [
    {
      id: 'b001',
      tender_id: 't001',
      contractor_id: 'c001',
      amount: 235000,
      proposal: 'We propose a phased approach over 8 weeks with minimal disruption to operations. Our team has completed 5 similar warehouse automation projects.',
      timeline_weeks: 8,
      status: 'pending', // pending | accepted | rejected
      submitted_at: '2026-02-05T16:30:00Z'
    },
    {
      id: 'b002',
      tender_id: 't001',
      contractor_id: 'c002',
      amount: 248000,
      proposal: 'Comprehensive solution including 12-month warranty and staff training. 10-week timeline with dedicated project manager.',
      timeline_weeks: 10,
      status: 'pending',
      submitted_at: '2026-02-07T11:20:00Z'
    },
    {
      id: 'b003',
      tender_id: 't002',
      contractor_id: 'c001',
      amount: 68000,
      proposal: 'Cat6A cabling throughout with enterprise-grade switches. 4-week completion.',
      timeline_weeks: 4,
      status: 'accepted',
      submitted_at: '2026-01-18T14:00:00Z'
    }
  ],

  // ==================== PROJECTS ====================
  projects: [
    {
      id: 'p001',
      title: 'Office Network Infrastructure Upgrade',
      client_id: 'cl001',
      contractor_id: 'c001',
      tender_id: 't002',
      bid_id: 'b003',
      status: 'in_progress', // planning | in_progress | snagging | completed | on_hold
      budget: 68000,
      start_date: '2026-02-03T09:00:00Z',
      end_date: '2026-02-28T17:00:00Z',
      progress_percent: 65,
      milestones: [
        {
          id: 'm001',
          title: 'Site Survey & Planning',
          status: 'completed',
          due_date: '2026-02-05',
          completed_date: '2026-02-05'
        },
        {
          id: 'm002',
          title: 'Floor 1 Cabling',
          status: 'completed',
          due_date: '2026-02-10',
          completed_date: '2026-02-09'
        },
        {
          id: 'm003',
          title: 'Floor 2 Cabling',
          status: 'in_progress',
          due_date: '2026-02-17',
          completed_date: null
        },
        {
          id: 'm004',
          title: 'Floor 3 Cabling',
          status: 'pending',
          due_date: '2026-02-24',
          completed_date: null
        },
        {
          id: 'm005',
          title: 'Switch Installation & Testing',
          status: 'pending',
          due_date: '2026-02-28',
          completed_date: null
        }
      ],
      tasks: [
        {
          id: 'task001',
          title: 'Install cable trays Floor 2',
          status: 'in_progress', // todo | in_progress | snag_list | completed
          assigned_to: 'c001',
          priority: 'high'
        },
        {
          id: 'task002',
          title: 'Terminate patch panels Floor 1',
          status: 'completed',
          assigned_to: 'c001',
          priority: 'medium'
        },
        {
          id: 'task003',
          title: 'Fix cable labeling Floor 1',
          status: 'snag_list',
          assigned_to: 'c001',
          priority: 'low'
        }
      ]
    }
  ],

  // ==================== MAGIC LINKS (Invite System) ====================
  magic_links: [
    {
      id: 'ml001',
      token: 'abc123xyz789',
      email: 'contractor1@buildcorp.com',
      role: 'contractor',
      created_by: 'u001',
      created_at: '2024-01-30T10:00:00Z',
      expires_at: '2024-02-06T10:00:00Z',
      used: true,
      used_at: '2024-02-01T14:30:00Z'
    },
    {
      id: 'ml002',
      token: 'def456uvw012',
      email: 'contractor2@techinstall.com',
      role: 'contractor',
      created_by: 'u001',
      created_at: '2024-02-08T10:00:00Z',
      expires_at: '2024-02-15T10:00:00Z',
      used: true,
      used_at: '2024-02-10T09:15:00Z'
    }
  ],

  // ==================== ACTIVITY LOG ====================
  activity_log: [
    {
      id: 'log001',
      user_id: 'u001',
      action: 'tender_created',
      details: 'Created tender: Warehouse Automation System Installation',
      timestamp: '2026-02-01T10:00:00Z'
    },
    {
      id: 'log002',
      user_id: 'u002',
      action: 'bid_submitted',
      details: 'Submitted bid for tender t001',
      timestamp: '2026-02-05T16:30:00Z'
    },
    {
      id: 'log003',
      user_id: 'u001',
      action: 'document_approved',
      details: 'Approved BuildCorp ISO 9001 Certificate',
      timestamp: '2026-02-02T11:00:00Z'
    }
  ]
};

// ==================== HELPER FUNCTIONS ====================

// Get user by email
function getUserByEmail(email) {
  return DB.users.find(u => u.email === email);
}

// Get contractor by user_id
function getContractorByUserId(userId) {
  return DB.contractors.find(c => c.user_id === userId);
}

// Get client by user_id
function getClientByUserId(userId) {
  return DB.clients.find(c => c.user_id === userId);
}

// Get all open tenders
function getOpenTenders() {
  return DB.tenders.filter(t => t.status === 'open');
}

// Get bids for a tender
function getBidsForTender(tenderId) {
  return DB.bids.filter(b => b.tender_id === tenderId);
}

// Get projects for client
function getProjectsForClient(clientId) {
  return DB.projects.filter(p => p.client_id === clientId);
}

// Get projects for contractor
function getProjectsForContractor(contractorId) {
  return DB.projects.filter(p => p.contractor_id === contractorId);
}

// Check document expiry (Watchdog Logic)
function checkDocumentExpiry() {
  const today = new Date('2026-02-13'); // Current date from system
  const alerts = [];

  DB.contractors.forEach(contractor => {
    contractor.documents.forEach(doc => {
      const expiryDate = new Date(doc.expiry);
      const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry < 30 && daysUntilExpiry >= 0) {
        alerts.push({
          contractor_id: contractor.id,
          contractor_name: contractor.company_name,
          document_type: doc.type,
          expiry_date: doc.expiry,
          days_remaining: daysUntilExpiry,
          severity: daysUntilExpiry < 7 ? 'critical' : 'warning'
        });
      } else if (daysUntilExpiry < 0) {
        alerts.push({
          contractor_id: contractor.id,
          contractor_name: contractor.company_name,
          document_type: doc.type,
          expiry_date: doc.expiry,
          days_remaining: daysUntilExpiry,
          severity: 'expired'
        });
      }
    });
  });

  return alerts;
}

// Generate magic link token
function generateMagicLink(email, role, createdBy) {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const link = {
    id: `ml${Date.now()}`,
    token: token,
    email: email,
    role: role,
    created_by: createdBy,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    used: false,
    used_at: null
  };
  
  DB.magic_links.push(link);
  return `https://syberverse-nexus.com/invite/${token}`;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DB,
    getUserByEmail,
    getContractorByUserId,
    getClientByUserId,
    getOpenTenders,
    getBidsForTender,
    getProjectsForClient,
    getProjectsForContractor,
    checkDocumentExpiry,
    generateMagicLink
  };
}
