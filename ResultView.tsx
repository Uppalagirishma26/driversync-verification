
import React from 'react';
import { CheckCircle, AlertTriangle, Printer, RotateCcw, User, Phone, MapPin, Calendar, CreditCard, Car, History, ShieldAlert, XCircle } from 'lucide-react';
import { MockDriverData } from '../types';

interface Props {
  data: MockDriverData;
  photoUrl: string;
  onRestart: () => void;
}

export const ResultView: React.FC<Props> = ({ data, photoUrl, onRestart }) => {
  const isCritical = data.status === 'FLAGGED';
  const isRejected = data.status === 'REJECTED';
  
  let statusBg = 'bg-green-100 text-green-700';
  let statusLabel = 'Verification Success';
  let statusIcon = <CheckCircle size={14} />;

  if (isCritical) {
    statusBg = 'bg-amber-100 text-amber-700';
    statusLabel = 'High Risk Warning';
    statusIcon = <ShieldAlert size={14} />;
  } else if (isRejected) {
    statusBg = 'bg-red-600 text-white';
    statusLabel = 'Verification Denied';
    statusIcon = <XCircle size={14} />;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 animate-in fade-in zoom-in duration-500">
      {isRejected && (
        <div className="mb-8 bg-red-600 text-white p-6 rounded-3xl shadow-2xl shadow-red-200 border-4 border-red-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <XCircle size={48} className="shrink-0" />
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">Access Denied</h2>
              <p className="font-medium opacity-90">{data.rejectionReason || 'Security protocols triggered. Identity verification unsuccessful.'}</p>
            </div>
          </div>
          <button 
            onClick={onRestart}
            className="px-6 py-3 bg-white text-red-600 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg"
          >
            Appeal / Re-Scan
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className={`inline-flex items-center space-x-2 ${statusBg} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2`}>
            {statusIcon}
            <span>{statusLabel} (Simulated)</span>
          </div>
          <h2 className={`text-3xl font-extrabold ${isRejected ? 'text-red-600' : 'text-slate-900'}`}>
            {isRejected ? 'Restricted Profile' : 'Driver Profile Result'}
          </h2>
        </div>
        {!isRejected && (
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Printer size={18} />
              <span>Print Report</span>
            </button>
            <button 
              onClick={onRestart}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200"
            >
              <RotateCcw size={18} />
              <span>New Session</span>
            </button>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRejected ? 'grayscale-[0.5] opacity-90' : ''}`}>
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border ${isRejected ? 'border-red-500 border-2' : (isCritical ? 'border-amber-200' : 'border-slate-100')} flex flex-col items-center relative overflow-hidden`}>
            {isRejected && (
              <div className="absolute top-10 -left-10 bg-red-600 text-white px-12 py-1 -rotate-45 font-black text-[10px] uppercase tracking-[0.2em] shadow-md z-10">
                Denied
              </div>
            )}
            <div className={`w-48 h-48 rounded-2xl overflow-hidden mb-6 border-4 ${isRejected ? 'border-red-100 grayscale' : 'border-slate-50'} ring-2 ${isRejected ? 'ring-red-600' : (isCritical ? 'ring-amber-500' : 'ring-blue-500')} ring-offset-2`}>
              {photoUrl ? (
                <img src={photoUrl} alt="Driver" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${isRejected ? 'bg-red-50 text-red-200' : 'bg-slate-100 text-slate-300'} flex items-center justify-center`}>
                  <User size={64} />
                </div>
              )}
            </div>
            <h3 className={`text-2xl font-bold text-center ${isRejected ? 'text-red-700' : (isCritical ? 'text-amber-700' : 'text-slate-900')}`}>{data.fullName}</h3>
            <p className="text-slate-500 font-medium">{data.licenseNumber}</p>
            
            <div className="w-full mt-8 space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-bold text-slate-500 uppercase">Trust Score</span>
                <span className={`text-sm font-black ${isRejected ? 'text-red-600' : (isCritical ? 'text-amber-600' : 'text-green-600')}`}>
                  {isRejected ? '00/100' : (isCritical ? '12/100' : '98/100')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-bold text-slate-500 uppercase">Validity</span>
                <span className={`text-sm font-black uppercase ${isRejected ? 'text-red-600' : (isCritical ? 'text-amber-600' : 'text-blue-600')}`}>
                  {isRejected ? 'REJECTED' : (isCritical ? 'FLAGGED' : 'Active')}
                </span>
              </div>
            </div>
          </div>

          <div className={`${isRejected || isCritical ? 'bg-red-600 text-white' : 'bg-red-50 border border-red-100 text-red-800'} rounded-2xl p-6 space-y-4 shadow-lg`}>
            <div className="flex items-center space-x-2 font-bold mb-2">
              <AlertTriangle size={20} />
              <span>{isRejected ? 'SECURITY BREACH' : (isCritical ? 'URGENT ATTENTION' : 'Mock Data Notice')}</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {isRejected 
                ? "This identity is blacklisted for serious offenses. Institutional access is prohibited. Simulated result." 
                : (isCritical 
                  ? "This identity profile has been flagged for multiple critical violations. In a real system, authorities would be notified immediately."
                  : "This is a demo. No real identification or police database access is performed. All data is generated randomly."
                )
              }
            </p>
          </div>
        </div>

        {/* Details Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${isRejected ? 'border-red-100' : 'border-slate-100'}`}>
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 ${isRejected || isCritical ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} rounded-lg flex items-center justify-center`}>
                <User size={18} />
              </div>
              Personal Identification
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <DataField label="Full Name" value={data.fullName} icon={<User size={16} />} />
              <DataField label="Date of Birth" value={data.dateOfBirth} icon={<Calendar size={16} />} />
              <DataField label="Address" value={data.address} icon={<MapPin size={16} />} />
              <DataField label="Phone Number" value={data.phoneNumber} icon={<Phone size={16} />} />
            </div>
          </div>

          <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border ${isRejected ? 'border-red-100' : 'border-slate-100'}`}>
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className={`w-8 h-8 ${isRejected || isCritical ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'} rounded-lg flex items-center justify-center`}>
                <Car size={18} />
              </div>
              Vehicle & Licensing
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <DataField label="Driving License No." value={data.licenseNumber} icon={<CreditCard size={16} />} />
              <DataField label="Vehicle Registration" value={data.vehicleNumber} icon={<Car size={16} />} />
              <DataField 
                label="Traffic Violation Count" 
                value={data.trafficCases.toString()} 
                icon={<History size={16} />} 
                highlight={isRejected || isCritical ? 'text-red-600 font-black' : 'text-green-600'}
                isCritical={isRejected || isCritical}
              />
              <DataField label="Verification Mode" value="Prototype Simulation" icon={<AlertTriangle size={16} />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataField: React.FC<{ label: string; value: string; icon: React.ReactNode; highlight?: string; isCritical?: boolean }> = ({ label, value, icon, highlight, isCritical }) => (
  <div className="space-y-1">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <div className="flex items-center gap-2">
      <p className={`text-lg font-bold ${highlight || 'text-slate-900'} truncate`}>{value}</p>
      {isCritical && label === "Traffic Violation Count" && (
        <span className="text-[10px] font-black bg-red-600 text-white px-1.5 py-0.5 rounded animate-pulse">DANGER</span>
      )}
    </div>
  </div>
);
