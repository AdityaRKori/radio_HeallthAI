import React, { useState } from 'react';
import PopulationHealthDashboard from './components/PopulationHealthDashboard';
import ClinicalInsightsDashboard from './components/ClinicalInsightsDashboard';
import OperationsDashboard from './components/OperationsDashboard';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';

type Page = 'population' | 'clinical' | 'operations' | 'admin';

function App() {
  const [activePage, setActivePage] = useState<Page>('clinical');

  const renderPage = () => {
    switch (activePage) {
      case 'population':
        return <PopulationHealthDashboard />;
      case 'clinical':
        return <ClinicalInsightsDashboard />;
      case 'operations':
        return <OperationsDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <PopulationHealthDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
