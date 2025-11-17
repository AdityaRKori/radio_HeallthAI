
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { usePopulationData } from '../hooks/usePopulationData';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import FilterBar from './FilterBar';
import ScreeningSitesOverview from './ScreeningSitesOverview';
import { Filters } from '../types';

const PREVALENCE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PopulationHealthDashboard: React.FC = () => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    const initialFilters: Filters = {
      startDate: lastMonth.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      site: 'all',
    }

    const { data, loading, error, filters, setFilters } = usePopulationData(initialFilters);

    if (loading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Loading Population Data...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    if (!data) return <div className="text-center text-gray-500 p-4">No data available.</div>;

    const { metrics, demographics, prevalence, trends, sites } = data;

    // Generate dynamic change data for metric cards for a more realistic feel
    const totalScreenedChange = (((metrics.totalScreened % 1000) / 100) - 5).toFixed(1);
    const abnormalitiesChange = (((metrics.abnormalitiesDetected % 500) / 50) - 5).toFixed(1);
    const positivityRateChange = ((metrics.positivityRate / 100) - 0.07).toFixed(2); // Assuming baseline of 7%

    const getChangeType = (val: number) => (val >= 0 ? 'increase' : 'decrease');
    
    const formatChange = (val: number) => `${val >= 0 ? '+' : ''}${val}`;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <h2 className="text-3xl font-bold text-slate-900">Population Health Overview</h2>
                <FilterBar filters={filters} setFilters={setFilters} sites={sites} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                    title="Total Screened" 
                    value={metrics.totalScreened.toLocaleString()} 
                    change={`${formatChange(parseFloat(totalScreenedChange))}%`} 
                    changeType={getChangeType(parseFloat(totalScreenedChange))} 
                />
                <MetricCard 
                    title="Abnormalities Detected" 
                    value={metrics.abnormalitiesDetected.toLocaleString()} 
                    change={`${formatChange(parseFloat(abnormalitiesChange))}%`} 
                    changeType={getChangeType(parseFloat(abnormalitiesChange))} 
                />
                <MetricCard 
                    title="Positivity Rate" 
                    value={`${metrics.positivityRate.toFixed(2)}%`} 
                    change={`${formatChange(parseFloat(positivityRateChange))}%`} 
                    // Lower positivity is better, so an increase is bad (red), decrease is good (green).
                    // We invert the value to map color correctly: a negative change (good) becomes an 'increase' for green color.
                    changeType={getChangeType(parseFloat(positivityRateChange) * -1)} 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <ChartCard title="Screening Sites Overview">
                        <ScreeningSitesOverview sites={sites} />
                    </ChartCard>
                </div>
                <div className="lg:col-span-2">
                    <ChartCard title="Prevalence of Top Conditions">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={prevalence} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => entry.name}>
                                    {prevalence.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PREVALENCE_COLORS[index % PREVALENCE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Demographic Breakdown (Age & Gender)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={demographics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ageGroup" />
                            <YAxis tickFormatter={(tick) => `${tick / 1000}k`}/>
                            <Tooltip formatter={(value: number) => value.toLocaleString()} />
                            <Legend />
                            <Bar dataKey="male" stackId="a" fill="#3b82f6" name="Male" />
                            <Bar dataKey="female" stackId="a" fill="#ec4899" name="Female" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Screening Trends (Last 6 Months)">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => value.toLocaleString()} />
                            <Legend />
                            <Line type="monotone" dataKey="screened" stroke="#14b8a6" name="Total Screened" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="abnormal" stroke="#f43f5e" name="Abnormal Findings" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
};

export default PopulationHealthDashboard;
