
import React from 'react';

interface PlaceholderPageProps {
    title: string;
    message: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message }) => {
    return (
        <div className="text-center py-20 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-lg text-gray-600">{message}</p>
            <div className="mt-8">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Coming Soon</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
