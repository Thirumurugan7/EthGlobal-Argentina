import { InvestmentOpportunity, Judgment } from '@/types';
import { mockOpportunities, mockJudgments } from './data';

export interface AnalyticsData {
  totalOpportunities: number;
  totalJudgments: number;
  averageScore: number;
  opportunitiesByStage: Record<string, number>;
  opportunitiesByIndustry: Record<string, number>;
  topScoredOpportunities: Array<{
    opportunity: InvestmentOpportunity;
    averageScore: number;
    judgmentCount: number;
  }>;
  judgmentsByRecommendation: Record<string, number>;
  scoreDistribution: Array<{ range: string; count: number }>;
}

export function getAnalytics(opportunities: InvestmentOpportunity[], judgments: Judgment[]): AnalyticsData {
  const totalOpportunities = opportunities.length;
  const totalJudgments = judgments.length;

  // Calculate average score
  const averageScore = totalJudgments > 0
    ? judgments.reduce((sum, j) => sum + j.overallScore, 0) / totalJudgments
    : 0;

  // Opportunities by stage
  const opportunitiesByStage: Record<string, number> = {};
  opportunities.forEach(opp => {
    opportunitiesByStage[opp.stage] = (opportunitiesByStage[opp.stage] || 0) + 1;
  });

  // Opportunities by industry
  const opportunitiesByIndustry: Record<string, number> = {};
  opportunities.forEach(opp => {
    opportunitiesByIndustry[opp.industry] = (opportunitiesByIndustry[opp.industry] || 0) + 1;
  });

  // Top scored opportunities
  const opportunityScores = opportunities.map(opp => {
    const oppJudgments = judgments.filter(j => j.opportunityId === opp.id);
    const avgScore = oppJudgments.length > 0
      ? oppJudgments.reduce((sum, j) => sum + j.overallScore, 0) / oppJudgments.length
      : 0;
    return {
      opportunity: opp,
      averageScore: avgScore,
      judgmentCount: oppJudgments.length,
    };
  }).filter(item => item.judgmentCount > 0)
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);

  // Judgments by recommendation
  const judgmentsByRecommendation: Record<string, number> = {};
  judgments.forEach(j => {
    judgmentsByRecommendation[j.recommendation] = (judgmentsByRecommendation[j.recommendation] || 0) + 1;
  });

  // Score distribution
  const scoreDistribution = [
    { range: '0-2', count: 0 },
    { range: '2-4', count: 0 },
    { range: '4-6', count: 0 },
    { range: '6-8', count: 0 },
    { range: '8-10', count: 0 },
  ];
  judgments.forEach(j => {
    const score = j.overallScore;
    if (score < 2) scoreDistribution[0].count++;
    else if (score < 4) scoreDistribution[1].count++;
    else if (score < 6) scoreDistribution[2].count++;
    else if (score < 8) scoreDistribution[3].count++;
    else scoreDistribution[4].count++;
  });

  return {
    totalOpportunities,
    totalJudgments,
    averageScore,
    opportunitiesByStage,
    opportunitiesByIndustry,
    topScoredOpportunities: opportunityScores,
    judgmentsByRecommendation,
    scoreDistribution,
  };
}

