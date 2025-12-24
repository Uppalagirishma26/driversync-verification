
import React, { useState, useCallback } from 'react';
import { AppStep, MockDriverData } from './types';
import { ConsentView } from './components/ConsentView';
import { UploadView } from './components/UploadView';
import { ProcessingView } from './components/ProcessingView';
import { ResultView } from './components/ResultView';
import { generateMockDriverData } from './services/mockDataService';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.CONSENT);
  const [mockData, setMockData] = useState<MockDriverData | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const handleConsent = () => setStep(AppStep.UPLOAD);

  const handlePhotoUploaded = (source: File | string | null, manualName?: string) => {
    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
        setMockData(generateMockDriverData(manualName));
        setStep(AppStep.PROCESSING);
      };
      reader.readAsDataURL(source);
    } else if (typeof source === 'string') {
      setPhotoUrl(source);
      setMockData(generateMockDriverData(manualName));
      setStep(AppStep.PROCESSING);
    } else {
      setPhotoUrl('');
      setMockData(generateMockDriverData(manualName));
      setStep(AppStep.PROCESSING);
    }
  };

  const handleProcessingComplete = () => setStep(AppStep.RESULT);

  const handleRestart = () => {
    setStep(AppStep.CONSENT);
    setMockData(null);
    setPhotoUrl('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleRestart}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Layout size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Driver<span className="text-blue-600">Sync</span></span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Project Docs</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">API Specs</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">Help</span>
            <button 
              onClick={handleRestart}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold"
            >
              Reset Demo
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        {step === AppStep.CONSENT && <ConsentView onConsent={handleConsent} />}
        {step === AppStep.UPLOAD && <UploadView onPhotoUploaded={handlePhotoUploaded} />}
        {step === AppStep.PROCESSING && <ProcessingView onComplete={handleProcessingComplete} />}
        {step === AppStep.RESULT && mockData && (
          <ResultView data={mockData} photoUrl={photoUrl} onRestart={handleRestart} />
        )}
      </main>

      {/* Global Footer Disclaimer */}
      <footer className="py-12 bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs font-medium tracking-wide leading-relaxed uppercase">
            Educational Prototype Submission &copy; 2024. All rights reserved. <br/>
            This is a demo. No real identification, face recognition, or police database access is performed.
            Data shown is purely fictional and randomly generated for UI demonstration purposes.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
