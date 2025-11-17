import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useReportData } from '../hooks/useReportData';
import MetricCard from './MetricCard';

const PREVALENCE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const ReportDashboard: React.FC = () => {
    const { data, loading, error } = useReportData();

    const handlePrint = () => {
        window.print();
    };
    
    const renderContent = () => {
        if (loading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Generating Report...</div>;
        if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
        if (!data) return <div className="text-center text-gray-500 p-4">Could not generate report data.</div>;

        const { reportDate, period, aiInsights, keyMetrics, population, clinical, operations, financials } = data;
        
        const formatChange = (val: number) => `${val >= 0 ? '+' : ''}${val.toFixed(1)}%`;
        const getChangeType = (val: number) => (val >= 0 ? 'increase' : 'decrease');

        return (
            <div id="report-content" className="bg-white p-8 rounded-lg shadow-lg font-serif">
                {/* Report Header */}
                <header className="border-b-2 border-slate-800 pb-4 mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">Monthly Analytics Report</h1>
                    <div className="flex justify-between items-baseline text-slate-600 mt-2">
                        <p>For the period of {period.start} to {period.end}</p>
                        <p>Generated on: {reportDate}</p>
                    </div>
                </header>

                {/* AI Insights Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-brand-teal-700 mb-4 font-sans">AI-Generated Insights</h2>
                    <div className="bg-brand-teal-50 border border-brand-teal-200 p-6 rounded-lg space-y-4">
                        <p className="text-slate-800 leading-relaxed">{aiInsights.summary}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div>
                                <h3 className="font-bold text-green-700 mb-2">Positive Trends</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                    {aiInsights.positiveTrends.map((trend, i) => <li key={i}>{trend}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-700 mb-2">Areas for Review</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                    {aiInsights.areasForReview.map((area, i) => <li key={i}>{area}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Key Metrics Overview */}
                <section className="mb-10">
                     <h2 className="text-2xl font-bold text-slate-800 mb-4 font-sans">Key Performance Indicators</h2>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard title="Total Screened" value={keyMetrics.totalScreened.toLocaleString()} change={formatChange(keyMetrics.totalScreenedChange)} changeType={getChangeType(keyMetrics.totalScreenedChange)} />
                        <MetricCard title="Revenue" value={`$${keyMetrics.revenue.toLocaleString()}`} change={formatChange(keyMetrics.revenueChange)} changeType={getChangeType(keyMetrics.revenueChange)} />
                        <MetricCard title="Pending Cases" value={keyMetrics.pendingCases.toLocaleString()} change={formatChange(keyMetrics.pendingCasesChange)} changeType={getChangeType(keyMetrics.pendingCasesChange * -1)} />
                        <MetricCard title="Equipment Uptime" value={`${keyMetrics.overallUptime}%`} change={formatChange(keyMetrics.overallUptimeChange)} changeType={getChangeType(keyMetrics.overallUptimeChange)} />
                     </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Population & Clinical */}
                    <section className="space-y-8">
                        <div className="chart-card-print p-6 rounded-lg border">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-sans">Prevalence of Conditions</h3>
                             <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={population.prevalence} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label>
                                        {population.prevalence.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PREVALENCE_COLORS[index % PREVALENCE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-card-print p-6 rounded-lg border">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-sans">Clinical Case Findings</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={clinical.casesByFinding} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" fontSize={12} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" name="Cases" fill="#14b8a6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                    
                    {/* Operations & Financials */}
                     <section className="space-y-8">
                        <div className="chart-card-print p-6 rounded-lg border">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-sans">Financial Performance</h3>
                             <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={financials.revenueTrends} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis tickFormatter={(tick) => `$${tick / 1000}k`} />
                                    <Tooltip formatter={(value: number) => `$${(value as number).toLocaleString()}`} />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-card-print p-6 rounded-lg border">
                             <h3 className="text-xl font-bold text-slate-800 mb-4 font-sans">Equipment Status</h3>
                             <table className="min-w-full text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-sans font-semibold">Machine</th>
                                        <th className="px-4 py-2 text-left font-sans font-semibold">Status</th>
                                        <th className="px-4 py-2 text-left font-sans font-semibold">Uptime</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operations.equipment.map(e => (
                                        <tr key={e.id} className="border-b">
                                            <td className="px-4 py-2">{e.name}</td>
                                            <td className="px-4 py-2">{e.status}</td>
                                            <td className="px-4 py-2">{e.uptime}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div id="report-actions" className="flex justify-between items-center">
                 <h2 className="text-3xl font-bold text-slate-900">Create Report</h2>
                 <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-brand-teal-700 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:ring-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2zM6 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Download Report
                 </button>
            </div>
            {renderContent()}
        </div>
    );
};

export default ReportDashboard;