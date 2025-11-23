import { InvestmentOpportunity, Judgment } from '@/types';

export function exportJudgmentsToCSV(opportunities: InvestmentOpportunity[], judgments: Judgment[]): string {
  const headers = [
    'Company Name',
    'Industry',
    'Stage',
    'Funding Amount',
    'Valuation',
    'Judge Name',
    'Overall Score',
    'Market Potential',
    'Team Quality',
    'Product Innovation',
    'Business Model',
    'Traction',
    'Recommendation',
    'Notes',
    'Judged At',
  ];

  const rows = judgments.map(j => {
    const opp = opportunities.find(o => o.id === j.opportunityId);
    return [
      opp?.companyName || 'N/A',
      opp?.industry || 'N/A',
      opp?.stage || 'N/A',
      opp?.fundingAmount.toString() || 'N/A',
      opp?.valuation.toString() || 'N/A',
      j.judgeName,
      j.overallScore.toFixed(2),
      j.scores.marketPotential.toString(),
      j.scores.teamQuality.toString(),
      j.scores.productInnovation.toString(),
      j.scores.businessModel.toString(),
      j.scores.traction.toString(),
      j.recommendation,
      j.notes.replace(/"/g, '""'), // Escape quotes for CSV
      new Date(j.judgedAt).toLocaleDateString(),
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

