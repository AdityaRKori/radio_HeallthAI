import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRegionalData } from '../hooks/useRegionalData';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';

const RegionalAnalyticsDashboard: React.FC = () => {
    const { data, loading, error } = useRegionalData();

    if (loading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Loading Regional Analytics...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!data) return <div className="text-center text-gray-500 p-4">No regional data available.</div>;

    const { totalInternationalCases, topCountry, casesByCountry } = data;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Regional Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard 
                    title="Total International Cases" 
                    value={totalInternationalCases.toLocaleString()} 
                />
                <MetricCard 
                    title="Top Country by Volume" 
                    value={`${topCountry.country} (${topCountry.cases.toLocaleString()})`}
                />
            </div>

            <ChartCard title="Cases by Country">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={casesByCountry}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 50,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="country" type="category" width={100} />
                        <Tooltip formatter={(value: number) => value.toLocaleString()} />
                        <Legend />
                        <Bar dataKey="cases" name="Radiology Cases" fill="#2dd4bf" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
};

export default RegionalAnalyticsDashboard;