import React, { useState } from 'react';
import { DecisionSupportAnalysis } from '../types';

interface DecisionSupportToolProps {
    analysisResult: DecisionSupportAnalysis | null;
    onAnalyze: () => void;
    onReset: () => void;
}

const UploadIcon = () => (
    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const DecisionSupportTool: React.FC<DecisionSupportToolProps> = ({ analysisResult, onAnalyze, onReset }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileName(event.target.files[0].name);
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                onAnalyze();
                setIsLoading(false);
            }, 1500);
        }
    };

    const handleResetClick = () => {
        setFileName(null);
        onReset();
    }
    
    const getFindingChipColor = (finding: DecisionSupportAnalysis['finding']) => {
        switch (finding) {
            case 'Normal':
                return 'bg-green-100 text-green-800';
            case 'Probable Tuberculosis':
            case 'Pneumonia':
                return 'bg-red-100 text-red-800';
            case 'Lung Nodules Detected':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    }

    const renderInitialState = () => (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <UploadIcon />
                <div className="flex text-sm text-slate-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-teal-600 hover:text-brand-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-teal-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.dicom" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">X-Ray, CT, or DICOM files up to 25MB</p>
            </div>
        </div>
    );
    
    const renderLoadingState = () => (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-slate-300 border-dashed rounded-md bg-slate-50">
             <div className="w-12 h-12 border-4 border-brand-teal-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4 text-slate-600 font-medium">Analyzing <span className="font-bold">{fileName}</span>...</p>
        </div>
    );

    const renderResultState = (result: DecisionSupportAnalysis) => (
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="p-6">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">AI Preliminary Analysis</h3>
                        <p className="text-sm text-slate-500">Analysis complete for: {fileName}</p>
                    </div>
                    <button onClick={handleResetClick} className="text-sm font-medium text-slate-500 hover:text-slate-800">Start New Analysis</button>
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 border-t border-slate-200">
                <div>
                     <h4 className="font-semibold text-slate-700 mb-2">Image Preview</h4>
                     <img src={result.imagePreviewUrl} alt="X-Ray Preview" className="rounded-lg shadow-md w-full object-cover" />
                </div>
                <div>
                    <h4 className="font-semibold text-slate-700 mb-3">Findings</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-slate-500">Primary Finding</p>
                            <span className={`text-sm font-semibold px-2 py-1 rounded-md inline-block mt-1 ${getFindingChipColor(result.finding)}`}>{result.finding}</span>
                        </div>
                         <div>
                            <p className="text-xs font-medium text-slate-500">Confidence Score</p>
                            <div className="flex items-center mt-1">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 mr-2">
                                    <div className="bg-brand-blue-500 h-2.5 rounded-full" style={{width: `${result.confidence}%`}}></div>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{result.confidence}%</span>
                            </div>
                        </div>
                        <div>
                             <p className="text-xs font-medium text-slate-500 mb-2">Key Observations</p>
                             <ul className="space-y-2">
                                {result.observations.map((obs, i) => (
                                    <li key={i} className="flex items-start text-sm text-slate-700"><CheckCircleIcon /> <span>{obs}</span></li>
                                ))}
                             </ul>
                        </div>
                         <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                             <p className="text-xs font-medium text-blue-800 mb-1">AI Summary & Recommendation</p>
                             <p className="text-sm text-blue-900">{result.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 flex justify-end gap-3 bg-white border-t border-slate-200">
                <button className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">Request Second Opinion</button>
                <button className="px-4 py-2 text-sm font-semibold bg-brand-teal-600 text-white rounded-md hover:bg-brand-teal-700 shadow-sm">Confirm Diagnosis</button>
            </div>
        </div>
    )

    if (isLoading) return renderLoadingState();
    if (analysisResult) return renderResultState(analysisResult);
    return renderInitialState();
};

export default DecisionSupportTool;
