import React from 'react';

interface MetricCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

const ArrowUpIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);


const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType }) => {
    const isIncrease = changeType === 'increase';
    // For positivity rate, a decrease is good (green), so we map decrease to green.
    // The logic in the dashboard handles sending the correct `changeType`.
    const changeColor = isIncrease ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-slate-900">{value}</p>
                {change && (
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${changeColor}`}>
                        {isIncrease ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <span className="ml-1">{change}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCard;