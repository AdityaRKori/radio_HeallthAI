import React from 'react';

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-200/50 h-full border-t-4 border-brand-teal-500">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
            {children}
        </div>
    );
};

export default ChartCard;