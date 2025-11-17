
import React from 'react';
import { TriageCase, TriagePriority, TriageStatus } from '../types';

const PriorityBadge: React.FC<{ priority: TriagePriority }> = ({ priority }) => {
    const priorityMap = {
        P1: "bg-red-500 text-white",
        P2: "bg-orange-400 text-white",
        P3: "bg-yellow-400 text-slate-800",
        P4: "bg-blue-400 text-white",
    };
    return <span className={`px-2 py-1 text-xs font-bold rounded-md inline-block leading-none ${priorityMap[priority]}`}>{priority}</span>;
};

const StatusBadge: React.FC<{ status: TriageStatus }> = ({ status }) => {
    const statusMap = {
        Pending: "bg-slate-200 text-slate-800",
        'In Progress': "bg-indigo-200 text-indigo-800",
        'On Hold': "bg-yellow-100 text-yellow-800",
        Completed: "bg-green-200 text-green-800",
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full inline-block leading-none ${statusMap[status]}`}>{status}</span>;
};

const WarningIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.22 3.008-1.742 3.008H4.42c-1.522 0-2.492-1.674-1.742-3.008l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);


const TriageCaseList: React.FC<{ cases: TriageCase[] }> = ({ cases }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Case ID</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                         <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Warning</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned Team</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">TAT</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {cases.map((c) => (
                        <tr key={c.caseId} className="hover:bg-slate-50">
                            <td className="px-4 py-3 whitespace-nowrap"><PriorityBadge priority={c.priority} /></td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-600">{c.caseId}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800 font-medium">{c.patientName} <span className="text-slate-500 font-normal">({c.patientAge})</span></td>
                            <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={c.status} /></td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">{c.hasWarning && <WarningIcon />}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{c.assignedTeam}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{c.turnaroundTime}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm space-x-2">
                                <button className="text-indigo-600 hover:text-indigo-900 font-medium text-xs">Assign/Order</button>
                                <button className="text-slate-500 hover:text-slate-800 font-medium text-xs">View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TriageCaseList;
