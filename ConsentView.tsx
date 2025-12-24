
import React from 'react';
import { ShieldCheck, Info, FileText } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';

interface Props {
  onConsent: () => void;
}

export const ConsentView: React.FC<Props> = ({ onConsent }) => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      <div className="flex flex-col justify-center space-y-8 order-2 md:order-1">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <ShieldCheck size={16} />
            <span>Prototype Version 1.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Advanced Driver <br/>
            <span className="text-blue-600">Verification</span> System
          </h1>
          <p className="text-lg text-slate-600">
            Secure, fast, and automated driver identification for high-compliance environments. 
            Experience our next-generation interface.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-3">
          <div className="flex items-start space-x-3">
            <Info className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-amber-900">Education & Prototype Only</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                This website is for demonstration purposes. It does not perform real identity checks, facial recognition, or connect to any government database. All data shown is 100% fictional.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onConsent}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-200"
          >
            I Consent & Start Demo
          </button>
          <div className="flex items-center space-x-2 text-slate-500 text-sm px-2">
            <FileText size={16} />
            <span>Project Submission: College Prototype</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center order-1 md:order-2">
        <div className="relative w-full max-w-sm">
          <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-3xl"></div>
          <QRCodeDisplay />
        </div>
      </div>
    </div>
  );
};
