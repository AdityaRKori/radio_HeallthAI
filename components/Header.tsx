import React from 'react';

type Page = 'population' | 'clinical' | 'operations' | 'admin' | 'regional' | 'report';

interface HeaderProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
    const navItems: { id: Page, label: string }[] = [
        { id: 'population', label: 'Population Health' },
        { id: 'clinical', label: 'Clinical Insights' },
        { id: 'operations', label: 'Operations' },
        { id: 'regional', label: 'Regional Analytics' },
        { id: 'admin', label: 'Admin' },
        { id: 'report', label: 'Create Report' },
    ];

    const activeClass = "bg-brand-teal-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm";
    const inactiveClass = "text-slate-600 hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium";

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-brand-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 5.636l-1.414 1.414M18.364 18.364l1.414 1.414M4.222 18.364l1.414-1.414M12 12a5 5 0 100-10 5 5 0 000 10z" />
                        </svg>
                        <h1 className="ml-3 text-2xl font-bold text-slate-800">Radiology Analytics</h1>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2 bg-slate-100 p-1 rounded-lg">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActivePage(item.id)}
                                    className={activePage === item.id ? activeClass : inactiveClass}
                                    aria-current={activePage === item.id ? 'page' : undefined}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;