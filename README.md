<div align="center">
  
  <!-- Qure-OS Logo -->
  <a href="https://ai.studio/apps/drive/1kguJ5Rdi5zZVISk58FQJzBhHYawByx5w?fullscreenApplet=true">
    <img src="public/logo.svg" alt="Qure-OS Logo" width="400" />
  </a>

  <br />
  <br />

  <a href="https://ai.studio/apps/drive/1kguJ5Rdi5zZVISk58FQJzBhHYawByx5w?fullscreenApplet=true">
    <img src="https://img.shields.io/badge/LAUNCH_APP-OPEN_DASHBOARD-0d9488?style=for-the-badge&logo=react&logoColor=white&labelColor=1e293b" alt="Launch App" height="35" />
  </a>
  
  <p align="center">
    <strong>The Operating System for High-Volume Radiology Screening</strong>
  </p>
</div>

---

## 📋 Table of Contents

1.  [The Story & Mission](#-the-story--mission)
2.  [The Problem](#-the-problem)
3.  [The Solution: Qure-OS](#-the-solution-qure-os)
4.  [Feature Deep Dive](#-feature-deep-dive)
5.  [Technical Workflows](#-technical-workflows)
6.  [System Architecture](#-system-architecture)

---

## 📖 The Story & Mission

In the fight against infectious diseases like Tuberculosis (TB) and silent killers like Lung Cancer, **time is the enemy**. 

Screening programs in developing regions often deploy mobile X-ray vans to rural areas, capturing thousands of images a day. However, the data often sits in silos. Radiologists are overwhelmed, equipment breaks down unnoticed, and patients with critical findings are lost in a chaotic paper trail.

**Qure-OS** was conceptualized to be the "Central Nervous System" for these initiatives. It is a personalized Health Management Information System (HMIS) designed specifically for the needs of AI-augmented radiology. It doesn't just store images; it *thinks*, *prioritizes*, and *alerts*.

---

## ⚠️ The Problem

| Challenge | Description |
| :--- | :--- |
| **Data Deluge** | A single screening site generates 500+ X-rays daily. Manual review is impossible. |
| **Triage Failure** | A patient with active TB might be 300th in the queue, waiting days for a result while infectious. |
| **Operational Opacity** | Administrators don't know if a CT scanner in a remote clinic is online or broken until end-of-month reports. |
| **Follow-up Leakage** | Positive cases are often lost to follow-up due to disconnected registration and result systems. |

---

## 💡 The Solution: Qure-OS

Qure-OS integrates **Clinical AI** (detection) with **Operational Intelligence** (logistics).

1.  **Ingest:** DICOM images are pushed from scanners.
2.  **Analyze:** AI algorithms run instantly, tagging findings (TB, Nodule, etc.).
3.  **Prioritize:** The "Smart Triage Engine" re-orders the radiologist's worklist.
4.  **Monitor:** IoT sensors track machine health and staff activity.

---

## 🔬 Feature Deep Dive

| Feature Module | Visual Overview | Details |
| :--- | :--- | :--- |
| **Population Health** | <img src="public/population_preview.svg" width="400" alt="Population Dashboard"> | **The "General's View"**<br>Aggregates data across all screening sites to visualize disease hotspots and demographic trends.<br>• **Metrics:** Total Screened, Positivity Rate.<br>• **Visuals:** Maps, Age Pyramids, Trends. |
| **Clinical AI** | <img src="public/clinical_preview.svg" width="400" alt="Clinical AI Dashboard"> | **The "Radiologist's Co-pilot"**<br>Uses deep learning to assist clinicians.<br>• **Smart Triage:** Sorts by Urgency.<br>• **Visual Grounding:** Bounding boxes.<br>• **Confidence Scores:** "92% TB Probability". |
| **Operations Center** | <img src="public/operations_preview.svg" width="400" alt="Operations Dashboard"> | **The "Control Tower"**<br>Ensures the machinery of healthcare keeps running.<br>• **Telemetry:** Scanner Online/Offline status.<br>• **Throughput:** Patients/Hour monitoring.<br>• **Resource Allocation:** Staff management. |

---

## ⚙️ Technical Workflows

### 1. Population Health Aggregation
How the system turns raw screening data into actionable epidemiological insights.

```mermaid
graph LR
    A[Raw Screening Data] -->|Ingest| B{Aggregation Engine}
    B -->|Filter| C[Positivity Heatmaps]
    B -->|Group By| D[Demographic Splits]
    B -->|Rank| E[Site Performance]
    
    style C fill:#ccfbf1,stroke:#0d9488,stroke-width:2px
    style D fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style E fill:#fef3c7,stroke:#d97706,stroke-width:2px
```

### 2. Clinical Decision Support (CDSS) Flow
The interaction loop between the Radiologist and the AI Assistant.

```mermaid
sequenceDiagram
    participant Radiologist
    participant CDSS_Interface
    participant AI_Model
    participant Patient_DB
    
    Radiologist->>CDSS_Interface: Select Next Patient
    CDSS_Interface->>Patient_DB: Fetch DICOM & History
    CDSS_Interface->>AI_Model: Request Real-time Inference
    AI_Model-->>CDSS_Interface: Return Mask & Probability (92%)
    CDSS_Interface-->>Radiologist: Render Heatmap Overlay
    Radiologist->>CDSS_Interface: "Confirm Diagnosis"
    CDSS_Interface->>Patient_DB: Update Record & Trigger Alert
```

### 3. Smart Triage Logic
The "Brain" that decides who gets treated first, replacing standard FIFO queues with AI-driven prioritization.

```mermaid
stateDiagram-v2
    [*] --> Incoming_Scan
    Incoming_Scan --> AI_Analysis
    
    state AI_Analysis {
        [*] --> Check_TB
        Check_TB --> Check_Nodules
        Check_Nodules --> Check_Pneumonia
    }
    
    AI_Analysis --> Score_Calculation
    Score_Calculation --> Priority_Assignment
    
    state Priority_Assignment {
        state "High Confidence (>85%)" as High
        state "Medium Confidence (>50%)" as Med
        state "Low Confidence (<50%)" as Low
        
        High --> P1_Critical: Flag Red
        Med --> P2_Urgent: Flag Orange
        Low --> P3_Routine: Standard Queue
    }
    
    P1_Critical --> Radiologist_Worklist: Top of List
    P2_Urgent --> Radiologist_Worklist: Middle of List
    P3_Routine --> Radiologist_Worklist: Bottom of List
```

---

## 🏗️ System Architecture

The app is built as a responsive **Single Page Application (SPA)** using **React 19** and **TypeScript**, styled with **Tailwind CSS**.

```mermaid
graph TD
    User[Clinician / Admin] -->|HTTPS| Frontend[React SPA (Vite)]
    
    subgraph "Qure-OS Frontend Layer"
        Frontend --> Router[Navigation Router]
        Router --> Dash1[Pop. Health Dashboard]
        Router --> Dash2[Clinical CDSS]
        Router --> Dash3[Ops Command Center]
        
        Dash1 --> Viz[Recharts Engine]
        Dash2 --> Inf[Inference Simulator]
        Dash3 --> Live[Real-time Hooks]
    end

    subgraph "Data Simulation Layer"
        Inf --> MockAI[Mock AI Service]
        Live --> MockIoT[Mock IoT Service]
        Viz --> MockDB[Mock Database]
    end
```

---

<div align="center">
    <p><em>Designed for Impact. Engineered for Speed.</em></p>
    <p>© 2024 Qure-OS Concept</p>
</div>
