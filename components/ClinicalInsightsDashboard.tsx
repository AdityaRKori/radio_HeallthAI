import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useClinicalData } from '../hooks/useClinicalData';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DecisionSupportTool from './DecisionSupportTool';
import { IssueUrgency, PatientFeedback, PatientWorkflowItem } from '../types';

const CASE_FINDING_COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#ef4444', '#6b7280', '#8b5cf6'];
const CASE_STATUS_COLORS = ['#f59e0b', '#6366f1', '#22c55e'];

const UrgencyBadge: React.FC<{ urgency: IssueUrgency }> = ({ urgency }) => {
    const urgencyMap = {
        High: "bg-red-100 text-red-800",
        Medium: "bg-yellow-100 text-yellow-800",
        Low: "bg-green-100 text-green-800",
    };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${urgencyMap[urgency]}`}>{urgency}</span>;
}

const WorkflowTable: React.FC<{ issues: PatientWorkflowItem[] }> = ({ issues }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Issue</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Urgency</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {issues.map((item) => (
                    <tr key={item.patientId}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{item.patientName} <span className='text-slate-500 font-normal'>({item.patientId})</span></td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{item.issue}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm"><UrgencyBadge urgency={item.urgency} /></td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm"><button className="font-medium text-brand-teal-600 hover:text-brand-teal-800">Resolve</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const FeedbackCard: React.FC<{ feedback: PatientFeedback }> = ({ feedback }) => (
    <div className="bg-slate-100 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-slate-800">{feedback.patientName}</p>
            <div className="flex items-center">
                <span className="text-yellow-500">{'★'.repeat(feedback.rating)}</span>
                <span className="text-slate-400">{'★'.repeat(5 - feedback.rating)}</span>
            </div>
        </div>
        <p className="text-sm text-slate-600 italic">"{feedback.comment}"</p>
    </div>
)

const ClinicalInsightsDashboard: React.FC = () => {
    const { data, loading, error, refresh } = useClinicalData();

    const handleAnalysisRequest = () => {
      refresh(true);
    };
    
    const handleReset = () => {
      refresh(false);
    }

    const renderContent = () => {
        if (loading) return <div className="flex justify-center items-center h-96 text-brand-teal-700">Loading Clinical Insights...</div>;
        if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
        if (!data) return <div className="text-center text-gray-500 p-4">No clinical data available.</div>;
        
        const { caseAnalytics, workflowIssues, patientFeedback } = data;

        return (
            <>
                <DecisionSupportTool analysisResult={data.decisionSupportAnalysis} onAnalyze={handleAnalysisRequest} onReset={handleReset} />

                <div className="mt-12 border-t border-slate-200 pt-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Radiology Cases Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <MetricCard title="Total Cases" value={caseAnalytics.totalCases.toLocaleString()} />
                        <MetricCard title="Pending Radiologist Review" value={caseAnalytics.pendingReview.toLocaleString()} />
                        <MetricCard title="AI/Rad Concordance" value={`${caseAnalytics.concordanceRate}%`} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                            <ChartCard title="Cases by Finding">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={caseAnalytics.casesByFinding} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                        <Bar dataKey="count" name="Cases" fill="#14b8a6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartCard>
                        </div>
                        <div className="lg:col-span-2">
                             <ChartCard title="Case Status">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={caseAnalytics.caseStatusDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="count" nameKey="name" label={(entry) => `${entry.name} (${entry.count})`}>
                                            {caseAnalytics.caseStatusDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={CASE_STATUS_COLORS[index % CASE_STATUS_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => value.toLocaleString()} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartCard>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 pt-8">
                     <h3 className="text-2xl font-bold text-slate-800 mb-4">Quality Control & Patient Workflow</h3>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ChartCard title="Patient Workflow Bottlenecks">
                            <WorkflowTable issues={workflowIssues} />
                        </ChartCard>
                        <ChartCard title="Recent Patient Feedback">
                            <div className="space-y-3">
                                {patientFeedback.map((fb, index) => <FeedbackCard key={index} feedback={fb} />)}
                            </div>
                        </ChartCard>
                     </div>
                </div>
            </>
        )
    }


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Clinical Decision Support & Analytics</h2>
            {renderContent()}
        </div>
    );
};

export default ClinicalInsightsDashboard;
