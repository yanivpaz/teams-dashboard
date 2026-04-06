export const scoreColor = (score) =>
  score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';

export const scoreBg = (score) =>
  score >= 80 ? '#f0fdf4' : score >= 60 ? '#fffbeb' : '#fef2f2';

export const scoreLabel = (score) =>
  score >= 80 ? 'Good' : score >= 60 ? 'Fair' : 'At Risk';
