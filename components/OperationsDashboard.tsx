
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useOperationalData } from '../hooks/useOperationalData';
import { useTriageData } from '../hooks/useTriageData';
import { EquipmentStatus, EquipmentStatusType, TriagePriority } from '../types';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import TriageCaseList from './TriageCaseList';

const StatusBadge: React.FC<{ status: EquipmentStatusType }> = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full inline-block leading-none";
    const statusMap = {
        Online: "bg-green-100 text-green-800",
        Offline: "bg-red-100 text-red-800",
        Maintenance: "bg-yellow-100 text-yellow-800",
    };
    return <span className={`${baseClasses} ${statusMap[status]}`}>{status}</span>;
};

const EquipmentStatusTable: React.FC<{ equipment: EquipmentStatus[] }> = ({ equipment }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Machine</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Uptime</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {equipment.map((item) => (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500"><StatusBadge status={item.status} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.uptime.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const priorityDetails: { [key in TriagePriority]: { title: string; color: string; } } = {
    P1: { title: 'P1 - Critical', color: 'border-red-500' },
    P2: { title: 'P2 - Urgent', color: 'border-orange-400' },
    P3: { title: 'P3 - Sub-Urgent', color: 'border-yellow-400' },
    P4: { title: 'P4 - Non-Urgent', color: 'border-blue-400' },
};

const OperationsDashboard: React.FC = () => {
    const { data: opsData, loading: opsLoading, error: opsError } = useOperationalData();
    const { data: triageData, loading: triageLoading, error: triageError } = useTriageData();

    if (opsLoading || triageLoading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Loading Operations Data...</div>;
    if (opsError || triageError) return <div className="text-center text-red-500 p-4">{opsError || triageError}</div>;
    if (!opsData || !triageData) return <div className="text-center text-gray-500 p-4">No operational data available.</div>;

    const { metrics, equipment, staffing, throughput, utilization } = opsData;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Operations Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Overall Equipment Uptime" value={`${metrics.overallUptime}%`} />
                <MetricCard title="Staff on Duty" value={metrics.staffOnDuty.toString()} />
                <MetricCard title="Avg. Patient Wait Time" value={`${metrics.avgWaitTime} min`} />
            </div>

            <div className="border-t border-slate-200 pt-8">
                 <h3 className="text-2xl font-bold text-slate-800 mb-4">Triage Priority Overview</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {triageData.priorityStats.map(stat => (
                        <div key={stat.priority} className={`bg-white p-5 rounded-xl shadow-lg shadow-slate-200/50 border-l-4 ${priorityDetails[stat.priority].color}`}>
                            <h4 className="font-bold text-lg text-slate-800">{priorityDetails[stat.priority].title}</h4>
                            <div className="mt-4 flex justify-between items-baseline">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{stat.pending}</p>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Pending</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{stat.completed}</p>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Completed</p>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
            
            <div className="border-t border-slate-200 pt-8">
                 <h3 className="text-2xl font-bold text-slate-800 mb-4">Smart Triage Queue</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <MetricCard title="Total Cases in Queue" value={triageData.totalCases.toString()} />
                    <MetricCard title="Pending Review" value={triageData.pendingCases.toString()} />
                    <MetricCard title="Completed Today" value={triageData.completedToday.toString()} />
                 </div>
                 <ChartCard title="Triage Worklist">
                    <TriageCaseList cases={triageData.cases} />
                 </ChartCard>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                <div className="lg:col-span-2 space-y-6">
                    <ChartCard title="Live Equipment Status">
                        <EquipmentStatusTable equipment={equipment} />
                    </ChartCard>
                </div>

                <div className="space-y-6 lg:col-span-1">
                    <ChartCard title="Staffing Levels">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={staffing} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="role" width={80} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="onDuty" name="On Duty" fill="#14b8a6" />
                                <Bar dataKey="scheduled" name="Scheduled" fill="#99f6e4" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
                
                 <div className="lg:col-span-2">
                    <ChartCard title="Patient Throughput by Hour">
                         <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={throughput} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="patientsScanned" name="Patients Scanned" stroke="#3b82f6" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <div className="lg:col-span-1">
                     <ChartCard title="Resource Utilization">
                        <div className="space-y-4 pt-2">
                            {utilization.map(item => (
                                <div key={item.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-base font-medium text-slate-700">{item.name}</span>
                                        <span className="text-sm font-medium text-slate-700">{item.utilization}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-brand-blue-500 h-2.5 rounded-full transition-all duration-500" 
                                            style={{width: `${item.utilization}%`}}
                                            aria-valuenow={item.utilization}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            role="progressbar"
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
};

export default OperationsDashboard;