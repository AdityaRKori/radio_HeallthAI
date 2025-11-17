import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAdminAnalyticsData } from '../hooks/useAdminAnalyticsData';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';

const AdminDashboard: React.FC = () => {
    const { data, loading, error } = useAdminAnalyticsData();

    if (loading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Loading Admin Analytics...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!data) return <div className="text-center text-gray-500 p-4">No data available.</div>;

    const { financials, revenueTrends, patientJourney } = data;

    const journeyData = [
        { name: 'Awaiting Results', count: patientJourney.awaitingResults },
        { name: 'Awaiting Billing', count: patientJourney.awaitingBilling },
        { name: 'Medication Pending', count: patientJourney.medicationPending },
    ];
    
    const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Administrative & Financial Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                    title="Revenue (This Month)" 
                    value={formatCurrency(financials.revenueThisMonth)} 
                />
                <MetricCard 
                    title="Outstanding Payments" 
                    value={formatCurrency(financials.outstandingPayments)} 
                />
                <MetricCard 
                    title="Operational Cost" 
                    value={formatCurrency(financials.operationalCost)} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Revenue Trend (Last 6 Months)">
                    <ResponsiveContainer width="100%" height={300}>
                         <LineChart data={revenueTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(tick) => `$${tick / 1000}k`} />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#14b8a6" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Patient Journey Bottlenecks">
                    <p className="text-sm text-slate-600 mb-4">
                        Showing patients with pending actions out of a total of <span className="font-bold">{patientJourney.totalPatients.toLocaleString()}</span> active patients.
                    </p>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={journeyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} patients`} />
                            <Bar dataKey="count" fill="#3b82f6" name="Patients" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default AdminDashboard;
