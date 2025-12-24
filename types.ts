
export enum AppStep {
  CONSENT = 'CONSENT',
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT'
}

export type VerificationStatus = 'APPROVED' | 'FLAGGED' | 'REJECTED';

export interface MockDriverData {
  fullName: string;
  address: string;
  dateOfBirth: string;
  phoneNumber: string;
  vehicleNumber: string;
  licenseNumber: string;
  trafficCases: number;
  status: VerificationStatus;
  rejectionReason?: string;
}
