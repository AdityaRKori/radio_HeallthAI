
export interface Metric {
  totalScreened: number;
  abnormalitiesDetected: number;
  positivityRate: number;
}

export interface DemographicData {
  ageGroup: string;
  male: number;
  female: number;
}

export interface PrevalenceData {
  name: string;
  value: number;
}

export interface TrendData {
  date: string;
  screened: number;
  abnormal: number;
}

export interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
  screenedCount: number;
}

export interface PopulationData {
  metrics: Metric;
  demographics: DemographicData[];
  prevalence: PrevalenceData[];
  trends: TrendData[];
  sites: Site[];
}

export interface Filters {
  startDate: string;
  endDate: string;
  site: string;
}

// --- Clinical Insights Data Types ---

export interface AIModelPerformance {
  metric: string;
  value: number;
}

export interface DecisionSupportAnalysis {
    finding: 'Normal' | 'Probable Tuberculosis' | 'Lung Nodules Detected' | 'Pneumonia';
    confidence: number;
    summary: string;
    imagePreviewUrl: string; // URL to a mock image
    observations: string[];
}

export interface CaseFinding {
    name: 'Tuberculosis' | 'Lung Nodules' | 'Pneumonia' | 'Cardiomegaly' | 'Normal' | 'Other';
    count: number;
}

export interface CaseStatus {
    name: 'Pending AI Analysis' | 'Pending Radiologist Review' | 'Review Complete';
    count: number;
}

export interface RadiologyCaseAnalytics {
    totalCases: number;
    pendingReview: number;
    concordanceRate: number; // AI vs Radiologist
    casesByFinding: CaseFinding[];
    caseStatusDistribution: CaseStatus[];
}

export type PatientIssueType = 'Missing Lab Results' | 'Billing Incomplete' | 'Medication Pickup Overdue';
export type IssueUrgency = 'High' | 'Medium' | 'Low';

export interface PatientWorkflowItem {
    patientId: string;
    patientName: string;
    issue: PatientIssueType;
    details: string;
    urgency: IssueUrgency;
}

export interface PatientFeedback {
    patientName: string;
    rating: number; // 1-5
    comment: string;
}

export interface ClinicalData {
  decisionSupportAnalysis: DecisionSupportAnalysis | null;
  caseAnalytics: RadiologyCaseAnalytics;
  workflowIssues: PatientWorkflowItem[];
  patientFeedback: PatientFeedback[];
  modelAccuracy: number;
}

// --- Operations Dashboard Data Types ---

export type EquipmentStatusType = 'Online' | 'Offline' | 'Maintenance';

export interface EquipmentStatus {
  id: string;
  name:string;
  type: 'MRI' | 'CT' | 'X-Ray';
  status: EquipmentStatusType;
  uptime: number; // percentage
}

export interface StaffingLevel {
  role: 'Radiologists' | 'Technicians';
  onDuty: number;
  scheduled: number;
}

export interface PatientThroughput {
  hour: string; // e.g., "9 AM"
  patientsScanned: number;
}

export interface ResourceUtilization {
  name: string; // e.g., "Screening Room 1"
  utilization: number; // percentage
}

export interface OperationalData {
  metrics: {
    overallUptime: number;
    staffOnDuty: number;
    avgWaitTime: number; // in minutes
  };
  equipment: EquipmentStatus[];
  staffing: StaffingLevel[];
  throughput: PatientThroughput[];
  utilization: ResourceUtilization[];
}

// --- Smart Triage System Types ---
export type TriagePriority = 'P1' | 'P2' | 'P3' | 'P4';
export type TriageStatus = 'Pending' | 'In Progress' | 'On Hold' | 'Completed';

export interface TriageCase {
    caseId: string;
    patientName: string;
    patientAge: number;
    priority: TriagePriority;
    status: TriageStatus;
    receivedAt: string; // ISO string
    assignedTeam: string;
    turnaroundTime: string; // e.g. "45m", "2h 15m"
    hasWarning: boolean;
}

export interface TriagePriorityStats {
    priority: TriagePriority;
    pending: number;
    completed: number;
}

export interface TriageData {
    totalCases: number;
    pendingCases: number;
    completedToday: number;
    cases: TriageCase[];
    priorityStats: TriagePriorityStats[];
}

// --- Admin Dashboard Data Types ---

export interface FinancialMetrics {
  revenueThisMonth: number;
  outstandingPayments: number;
  operationalCost: number;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
}

export interface PatientJourneyStats {
  totalPatients: number;
  awaitingResults: number;
  awaitingBilling: number;
  medicationPending: number;
}

export interface AdminAnalyticsData {
  financials: FinancialMetrics;
  revenueTrends: RevenueTrend[];
  patientJourney: PatientJourneyStats;
}