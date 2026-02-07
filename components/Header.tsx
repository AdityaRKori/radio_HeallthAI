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

    const activeClass = "bg-brand-teal-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm transition-colors duration-200";
    const inactiveClass = "text-slate-600 hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";

    return (
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('population')}>
                        {/* Custom Logo: AI Radiology Shield */}
                        <div className="bg-brand-teal-50 p-2 rounded-lg border border-brand-teal-100">
                            <svg className="h-8 w-8 text-brand-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3v18" />
                                <path d="M16 8.5a4 4 0 0 1 0 7" />
                                <path d="M8 8.5a4 4 0 0 0 0 7" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M19.5 5.5a9 9 0 0 1 0 13" />
                                <path d="M4.5 5.5a9 9 0 0 0 0 13" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 leading-none">Qure-OS</h1>
                            <p className="text-[0.65rem] uppercase tracking-wider font-semibold text-brand-teal-600">Radiology Intelligence Platform</p>
                        </div>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2 bg-slate-100/50 p-1.5 rounded-lg border border-slate-200/50">
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