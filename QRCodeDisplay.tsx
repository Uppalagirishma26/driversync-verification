
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export const QRCodeDisplay: React.FC = () => {
  const currentUrl = window.location.href;

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Demo Access Link</h3>
      <div className="bg-white p-2 rounded-xl border-4 border-slate-900">
        <QRCodeSVG 
          value={currentUrl} 
          size={160}
          level="H"
          includeMargin={false}
        />
      </div>
      <p className="mt-4 text-xs text-slate-400 text-center max-w-[180px]">
        Scan this code on a mobile device to test the responsive UI flow.
      </p>
    </div>
  );
};
