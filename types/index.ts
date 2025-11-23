export interface InvestmentOpportunity {
  id: string;
  companyName: string;
  industry: string;
  description: string;
  fundingAmount: number;
  valuation: number;
  stage: 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+';
  location: string;
  founders: string[];
  website?: string;
  pitchDeck?: string;
  createdAt: string;
  tags: string[];
}

export interface Judgment {
  id: string;
  opportunityId: string;
  judgeName: string;
  scores: {
    marketPotential: number;
    teamQuality: number;
    productInnovation: number;
    businessModel: number;
    traction: number;
  };
  overallScore: number;
  notes: string;
  recommendation: 'Strong Pass' | 'Pass' | 'Weak Pass' | 'Reject';
  judgedAt: string;
}

export interface JudgmentCriteria {
  marketPotential: {
    label: string;
    description: string;
  };
  teamQuality: {
    label: string;
    description: string;
  };
  productInnovation: {
    label: string;
    description: string;
  };
  businessModel: {
    label: string;
    description: string;
  };
  traction: {
    label: string;
    description: string;
  };
}

