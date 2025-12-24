
import React, { useEffect, useState } from 'react';
import { Loader2, Cpu, Database, Fingerprint } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const ProcessingView: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing verification engines...');

  useEffect(() => {
    const statuses = [
      'Accessing encrypted channels...',
      'Validating biometric markers...',
      'Retrieving institutional datasets...',
      'Compiling final verification report...',
      'Finalizing secure tunnel...'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update status text based on progress
        const statusIdx = Math.floor((next / 100) * statuses.length);
        if (statuses[statusIdx]) setStatus(statuses[statusIdx]);
        
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-xl mx-auto py-20 px-4 flex flex-col items-center text-center">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <Loader2 className="animate-spin text-blue-600" size={80} />
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-2">Analyzing Data</h2>
      <p className="text-slate-500 mb-10 max-w-sm">{status}</p>

      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full">
        <div className="flex flex-col items-center space-y-2 opacity-60">
          <Cpu className="text-slate-400" size={24} />
          <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-500">Processing Unit</span>
        </div>
        <div className="flex flex-col items-center space-y-2 opacity-60">
          <Database className="text-slate-400" size={24} />
          <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-500">Database Sync</span>
        </div>
        <div className="flex flex-col items-center space-y-2 opacity-60">
          <Fingerprint className="text-slate-400" size={24} />
          <span className="text-[10px] uppercase font-bold tracking-tighter text-slate-500">Biometrics</span>
        </div>
      </div>

      <div className="mt-16 p-3 bg-red-50 border border-red-100 rounded-lg">
        <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">
          Prototype Simulation Environment - No Real Data Processed
        </p>
      </div>
    </div>
  );
};
