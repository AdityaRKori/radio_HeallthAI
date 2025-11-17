
import { PopulationData, Filters, ClinicalData, OperationalData, EquipmentStatus, StaffingLevel, TriageData, TriageCase, TriagePriority, TriageStatus, AdminAnalyticsData, TriagePriorityStats } from '../types';

const generateMockPopulationData = (filters: Filters): PopulationData => {
  // A simple seed based on filters to make data appear dynamic
  const seed = filters.site.length + new Date(filters.startDate).getDate();
  const totalScreened = 125430 + seed * 100;

  return {
    metrics: {
      totalScreened: totalScreened,
      abnormalitiesDetected: 8790 + seed * 5,
      positivityRate: 7.01 + (seed % 10) / 100,
    },
    demographics: [
      { ageGroup: '0-18', male: 2500 + seed, female: 2300 + seed },
      { ageGroup: '19-35', male: 18000 + seed * 10, female: 19500 + seed * 10 },
      { ageGroup: '36-50', male: 22000 + seed * 15, female: 21000 + seed * 15 },
      { ageGroup: '51-65', male: 15000 + seed * 12, female: 13000 + seed * 12 },
      { ageGroup: '65+', male: 6000 + seed * 5, female: 7000 + seed * 5 },
    ],
    prevalence: [
      { name: 'Tuberculosis', value: 1200 + seed },
      { name: 'Lung Nodules', value: 3500 + seed * 2 },
      { name: 'Pneumonia', value: 850 + seed * 0.5 },
      { name: 'Cardiomegaly', value: 2100 + seed * 1.5 },
      { name: 'Other', value: 1140 + seed },
    ],
    trends: [
      { date: 'Jan 23', screened: 9800, abnormal: 650 },
      { date: 'Feb 23', screened: 10200, abnormal: 710 },
      { date: 'Mar 23', screened: 11500, abnormal: 790 },
      { date: 'Apr 23', screened: 11200, abnormal: 750 },
      { date: 'May 23', screened: 12300, abnormal: 850 },
      { date: 'Jun 23', screened: 12800 + seed * 10, abnormal: 910 + seed },
    ],
    sites: [
        { id: 'all', name: 'All Sites', lat: 39.8283, lng: -98.5795, screenedCount: totalScreened },
        { id: 'site_a', name: 'Metro Health Center', lat: 40.7128, lng: -74.0060, screenedCount: 45231 },
        { id: 'site_b', name: 'Suburban Diagnostics', lat: 34.0522, lng: -118.2437, screenedCount: 32890 },
        { id: 'site_c', name: 'Rural Screening Unit', lat: 41.8781, lng: -87.6298, screenedCount: 15678 },
        { id: 'site_d', name: 'Northern Medical Imaging', lat: 47.6062, lng: -122.3321, screenedCount: 21331 },
        { id: 'site_e', name: 'Southwest General', lat: 29.7604, lng: -95.3698, screenedCount: 10300 },
    ],
  };
};

export const fetchPopulationData = (filters: Filters): Promise<PopulationData> => {
  console.log('Fetching population data with filters:', filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockPopulationData(filters));
    }, 800); // Simulate network delay
  });
};

// --- Mock Service for Clinical Insights ---

const generateMockClinicalData = (imageUploaded: boolean): ClinicalData => {
    return {
        modelAccuracy: 98.7,
        decisionSupportAnalysis: imageUploaded ? {
            finding: 'Probable Tuberculosis',
            confidence: 92.5,
            summary: "The analysis indicates opacities in the upper lobes, consistent with characteristics of Tuberculosis. Recommend further testing for confirmation.",
            imagePreviewUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
            observations: [
                "Apical and posterior segments of the upper lobes show consolidation.",
                "Presence of cavitation within the lesion.",
                "No significant pleural effusion noted."
            ]
        } : null,
        caseAnalytics: {
            totalCases: 1845,
            pendingReview: 127,
            concordanceRate: 96.2,
            casesByFinding: [
                { name: 'Normal', count: 1205 },
                { name: 'Lung Nodules', count: 350 },
                { name: 'Tuberculosis', count: 98 },
                { name: 'Pneumonia', count: 85 },
                { name: 'Cardiomegaly', count: 77 },
                { name: 'Other', count: 30 },
            ],
            caseStatusDistribution: [
                { name: 'Pending AI Analysis', count: 45 },
                { name: 'Pending Radiologist Review', count: 127 },
                { name: 'Review Complete', count: 1673 },
            ]
        },
        workflowIssues: [
            { patientId: 'P001', patientName: 'Jane Doe', issue: 'Missing Lab Results', details: 'Sputum test results pending for 48h+', urgency: 'High'},
            { patientId: 'P002', patientName: 'John Smith', issue: 'Billing Incomplete', details: 'Insurance pre-authorization failed.', urgency: 'Medium' },
            { patientId: 'P003', patientName: 'Emily Jones', issue: 'Medication Pickup Overdue', details: 'Prescription ready for 3 days.', urgency: 'Low' },
            { patientId: 'P004', patientName: 'Michael Brown', issue: 'Missing Lab Results', details: 'Blood work not received from external lab.', urgency: 'High' },
        ],
        patientFeedback: [
            { patientName: 'A. Williams', rating: 5, comment: "The process was very smooth and the staff were excellent."},
            { patientName: 'C. Davis', rating: 4, comment: "A bit of a wait, but overall a good experience."},
            { patientName: 'L. Miller', rating: 5, comment: "Very professional and clean facility. Highly recommend."},
        ]
    };
};

export const fetchClinicalData = (imageUploaded = false): Promise<ClinicalData> => {
    console.log('Fetching clinical insights data...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateMockClinicalData(imageUploaded));
        }, 1200);
    });
};


// --- Mock Service for Operations Dashboard ---

const generateMockOperationalData = (): OperationalData => {
    const equipmentStatuses: EquipmentStatus[] = [
        { id: 'mri-01', name: 'MRI Scanner A', type: 'MRI', status: 'Online', uptime: 99.8 },
        { id: 'ct-01', name: 'CT Scanner 1', type: 'CT', status: 'Online', uptime: 99.5 },
        { id: 'ct-02', name: 'CT Scanner 2', type: 'CT', status: 'Maintenance', uptime: 99.6 },
        { id: 'xray-01', name: 'X-Ray Room 1', type: 'X-Ray', status: 'Online', uptime: 99.9 },
        { id: 'xray-02', name: 'X-Ray Room 2', type: 'X-Ray', status: 'Offline', uptime: 98.2 },
        { id: 'xray-03', name: 'X-Ray Room 3', type: 'X-Ray', status: 'Online', uptime: 99.7 },
    ];

    const staffing: StaffingLevel[] = [
        { role: 'Radiologists', onDuty: 8, scheduled: 10 },
        { role: 'Technicians', onDuty: 15, scheduled: 15 },
    ];
    
    const throughput = [
        { hour: '8 AM', patientsScanned: 5 },
        { hour: '9 AM', patientsScanned: 12 },
        { hour: '10 AM', patientsScanned: 18 },
        { hour: '11 AM', patientsScanned: 25 },
        { hour: '12 PM', patientsScanned: 22 },
        { hour: '1 PM', patientsScanned: 15 },
        { hour: '2 PM', patientsScanned: 28 },
        { hour: '3 PM', patientsScanned: 24 },
        { hour: '4 PM', patientsScanned: 19 },
    ];

    return {
        metrics: {
            overallUptime: 99.4,
            staffOnDuty: staffing.reduce((sum, s) => sum + s.onDuty, 0),
            avgWaitTime: 22,
        },
        equipment: equipmentStatuses,
        staffing,
        throughput,
        utilization: [
            { name: "Screening Room 1", utilization: 85 },
            { name: "Screening Room 2", utilization: 92 },
            { name: "Screening Room 3", utilization: 65 },
            { name: "Diagnostic Room A", utilization: 78 },
        ]
    };
};

export const fetchOperationalData = (): Promise<OperationalData> => {
    console.log('Fetching operational data...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateMockOperationalData());
        }, 700);
    });
};

// --- Mock Service for Smart Triage System ---

const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie", "Michael", "Sarah"];
const lastNames = ["Smith", "Doe", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis"];
const teams = ["Alpha Team", "Bravo Team", "Charlie Team", "Delta Team"];
const priorities: TriagePriority[] = ['P1', 'P2', 'P3', 'P4'];
const statuses: TriageStatus[] = ['Pending', 'In Progress', 'On Hold', 'Completed'];

const generateMockTriageData = (): TriageData => {
    const cases: TriageCase[] = Array.from({ length: 25 }, (_, i) => {
        const priority = priorities[Math.floor(Math.random() * 4)];
        const status = statuses[Math.floor(Math.random() * 4)];
        const received = new Date();
        received.setHours(received.getHours() - Math.random() * 48);

        let turnaroundTime = "-";
        if (status === 'Completed') {
            const tatMinutes = 15 + Math.floor(Math.random() * 240); // 15m to 4h
            const hours = Math.floor(tatMinutes / 60);
            const minutes = tatMinutes % 60;
            turnaroundTime = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
        }

        return {
            caseId: `C2024-${1845 + i}`,
            patientName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)][0]}.`,
            patientAge: 25 + Math.floor(Math.random() * 50),
            priority,
            status,
            receivedAt: received.toISOString(),
            assignedTeam: status === 'Pending' ? '-' : teams[Math.floor(Math.random() * teams.length)],
            turnaroundTime,
            hasWarning: priority === 'P1' || (priority === 'P2' && Math.random() > 0.7),
        };
    });

    const pendingStatuses: TriageStatus[] = ['Pending', 'In Progress', 'On Hold'];
    const pendingCases = cases.filter(c => pendingStatuses.includes(c.status)).length;
    const completedToday = cases.filter(c => {
        const receivedDate = new Date(c.receivedAt);
        const today = new Date();
        return c.status === 'Completed' && receivedDate.getDate() === today.getDate();
    }).length;

    const priorityStats: TriagePriorityStats[] = priorities.map(p => {
        const priorityCases = cases.filter(c => c.priority === p);
        return {
            priority: p,
            pending: priorityCases.filter(c => pendingStatuses.includes(c.status)).length,
            completed: priorityCases.filter(c => c.status === 'Completed').length,
        };
    });

    return {
        totalCases: cases.length,
        pendingCases,
        completedToday,
        cases,
        priorityStats,
    };
};

export const fetchTriageData = (): Promise<TriageData> => {
    console.log('Fetching triage data...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateMockTriageData());
        }, 500);
    });
};

// --- Mock Service for Admin Dashboard ---

const generateMockAdminAnalyticsData = (): AdminAnalyticsData => {
    return {
        financials: {
            revenueThisMonth: 125430,
            outstandingPayments: 15230,
            operationalCost: 65800,
        },
        revenueTrends: [
            { month: 'Jan', revenue: 98000 },
            { month: 'Feb', revenue: 102000 },
            { month: 'Mar', revenue: 115000 },
            { month: 'Apr', revenue: 112000 },
            { month: 'May', revenue: 123000 },
            { month: 'Jun', revenue: 128000 },
        ],
        patientJourney: {
            totalPatients: 2340,
            awaitingResults: 125,
            awaitingBilling: 78,
            medicationPending: 45,
        }
    };
}

export const fetchAdminAnalyticsData = (): Promise<AdminAnalyticsData> => {
    console.log('Fetching admin analytics data...');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateMockAdminAnalyticsData());
        }, 650);
    });
}