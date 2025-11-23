import { InvestmentOpportunity, Judgment } from '@/types';

export const mockOpportunities: InvestmentOpportunity[] = [
  {
    id: '1',
    companyName: 'TechFlow AI',
    industry: 'Artificial Intelligence',
    description: 'Revolutionary AI platform for automating business workflows with advanced machine learning capabilities. Our solution reduces operational costs by 60% and increases productivity across industries.',
    fundingAmount: 5000000,
    valuation: 25000000,
    stage: 'Series A',
    location: 'San Francisco, CA',
    founders: ['Sarah Chen', 'Michael Rodriguez'],
    website: 'https://techflow.ai',
    tags: ['AI', 'SaaS', 'Enterprise'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    industry: 'Clean Energy',
    description: 'Next-generation solar panel technology with 40% higher efficiency than current market standards. Targeting residential and commercial markets with scalable manufacturing.',
    fundingAmount: 8000000,
    valuation: 40000000,
    stage: 'Series B',
    location: 'Austin, TX',
    founders: ['David Park', 'Emily Watson'],
    website: 'https://greenenergy.io',
    tags: ['CleanTech', 'Hardware', 'Sustainability'],
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    companyName: 'HealthSync Platform',
    industry: 'Healthcare',
    description: 'Integrated healthcare management platform connecting patients, providers, and insurers. Real-time data synchronization and AI-powered diagnostics.',
    fundingAmount: 3000000,
    valuation: 15000000,
    stage: 'Seed',
    location: 'Boston, MA',
    founders: ['Dr. James Wilson', 'Lisa Thompson'],
    website: 'https://healthsync.com',
    tags: ['HealthTech', 'B2B', 'Data'],
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    companyName: 'FinTech Pro',
    industry: 'Financial Services',
    description: 'Blockchain-based payment infrastructure for cross-border transactions. Reducing fees by 80% and transaction time from days to seconds.',
    fundingAmount: 10000000,
    valuation: 50000000,
    stage: 'Series A',
    location: 'New York, NY',
    founders: ['Robert Kim', 'Amanda Lee'],
    website: 'https://fintechpro.io',
    tags: ['FinTech', 'Blockchain', 'Payments'],
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    companyName: 'EduLearn VR',
    industry: 'Education',
    description: 'Immersive VR learning platform for K-12 education. Making complex subjects accessible through interactive 3D experiences.',
    fundingAmount: 2000000,
    valuation: 10000000,
    stage: 'Pre-Seed',
    location: 'Seattle, WA',
    founders: ['Jennifer Martinez', 'Chris Anderson'],
    website: 'https://edulearnvr.com',
    tags: ['EdTech', 'VR', 'Consumer'],
    createdAt: '2024-02-15',
  },
];

export const mockJudgments: Judgment[] = [
  {
    id: 'j1',
    opportunityId: '1',
    judgeName: 'John Investor',
    scores: {
      marketPotential: 8,
      teamQuality: 9,
      productInnovation: 8,
      businessModel: 7,
      traction: 6,
    },
    overallScore: 7.6,
    notes: 'Strong team with impressive backgrounds. Market is competitive but large. Need to see more traction before committing.',
    recommendation: 'Pass',
    judgedAt: '2024-02-20',
  },
];

export function getOpportunityById(id: string): InvestmentOpportunity | undefined {
  return mockOpportunities.find(opp => opp.id === id);
}

export function getJudgmentsByOpportunityId(opportunityId: string): Judgment[] {
  return mockJudgments.filter(judgment => judgment.opportunityId === opportunityId);
}

export function calculateOverallScore(scores: Judgment['scores']): number {
  const values = Object.values(scores);
  return values.reduce((sum, score) => sum + score, 0) / values.length;
}

