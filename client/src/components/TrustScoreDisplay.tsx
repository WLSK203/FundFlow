import React from 'react';
import { TrustScore } from '../types';

interface TrustScoreDisplayProps {
  score: number;
  trend?: number[];
  size?: 'small' | 'medium' | 'large';
  showTrend?: boolean;
  className?: string;
}

const TrustScoreDisplay: React.FC<TrustScoreDisplayProps> = ({
  score,
  trend,
  size = 'medium',
  showTrend = false,
  className = ''
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-trust-600 bg-trust-50 border-trust-200';
    if (score >= 80) return 'text-trust-500 bg-trust-50 border-trust-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm px-3 py-1';
      case 'large':
        return 'text-lg px-4 py-2';
      default:
        return 'text-base px-3 py-2';
    }
  };

  const getTrendIcon = () => {
    if (!trend || trend.length < 2) return null;
    
    const latest = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    
    if (latest > previous) {
      return <span className="text-trust-600 ml-1">↗</span>;
    } else if (latest < previous) {
      return <span className="text-red-600 ml-1">↘</span>;
    }
    return <span className="text-neutral-600 ml-1">→</span>;
  };

  return (
    <div className={`inline-flex items-center rounded-lg border font-semibold ${getScoreColor(score)} ${getSizeClasses()} ${className}`}>
      <span>{score}%</span>
      {showTrend && getTrendIcon()}
      {size === 'large' && (
        <span className="ml-2 text-sm font-normal opacity-75">
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
};

export default TrustScoreDisplay;
