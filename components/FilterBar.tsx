import React from 'react';
import { Filters, Site } from '../types';

interface FilterBarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    sites: Site[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, sites }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const inputBaseClasses = "block w-full pl-3 pr-2 py-2 text-base bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:border-brand-teal-500 sm:text-sm rounded-md shadow-sm";

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-100 p-3 rounded-lg">
            <div className="flex items-center gap-2">
                <label htmlFor="site" className="text-sm font-medium text-slate-700">Site:</label>
                <select
                    id="site"
                    name="site"
                    value={filters.site}
                    onChange={handleInputChange}
                    className={`${inputBaseClasses} pr-10`}
                >
                    {sites.map(site => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="startDate" className="text-sm font-medium text-slate-700">From:</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="endDate" className="text-sm font-medium text-slate-700">To:</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                />
            </div>
        </div>
    );
};

export default FilterBar;