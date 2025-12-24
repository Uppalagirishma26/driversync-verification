
import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, Keyboard } from 'lucide-react';

interface Props {
  onPhotoUploaded: (file: File | string | null, manualName?: string) => void;
}

export const UploadView: React.FC<Props> = ({ onPhotoUploaded }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [manualName, setManualName] = useState('');
  const [showManual, setShowManual] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setTimeout(() => onPhotoUploaded(file), 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;
    onPhotoUploaded(null, manualName);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Document Capture</h2>
        <p className="text-slate-500 mt-2">Upload a photo or enter a test name for simulation</p>
      </div>

      {!preview ? (
        <div className="space-y-6">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <Camera size={32} />
            </div>
            <p className="text-lg font-medium text-slate-700">Drag & Drop driver photo</p>
            <p className="text-slate-400 text-sm mt-1 mb-6">Supports JPG, PNG, WEBP</p>
            
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="bg-[#f8fafc] px-4 text-slate-400">DEMO QUICK TRIGGERS</span></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setShowManual(!showManual)}
              className="py-4 border-2 border-slate-200 border-dashed rounded-2xl text-slate-500 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Keyboard size={20} />
              {showManual ? 'Hide Manual Entry' : 'Manual Name Entry'}
            </button>
          </div>

          {showManual && (
            <form onSubmit={handleManualSubmit} className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Simulation Name</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Amara Kovacs"
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800"
                >
                  Verify
                </button>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 italic">
                Enter restricted names to simulate a negative verification response.
              </p>
            </form>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center animate-pulse">
          <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-2xl border-4 border-blue-500">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <CheckCircle2 className="text-white" size={48} />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 text-center">Processing Identification...</p>
          <p className="text-slate-500 mt-1 italic text-sm">Performing biometric comparison (Simulation)</p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <CheckCircle2 className="text-green-500 shrink-0" size={20} />
          <span className="text-sm text-slate-600">Secure AES-256 Encryption (Simulation)</span>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <AlertCircle className="text-blue-500 shrink-0" size={20} />
          <span className="text-sm text-slate-600">Privacy Compliant Interface</span>
        </div>
      </div>
    </div>
  );
};
