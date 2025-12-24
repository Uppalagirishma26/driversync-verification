
import { MockDriverData, VerificationStatus } from '../types';

const FIRST_NAMES = ['Alexander', 'Isabella', 'Julian', 'Sophia', 'Marcus', 'Elena', 'Viktor', 'Amara', 'Dominic', 'Lila', 'Osama'];
const LAST_NAMES = ['Vance', 'Sterling', 'Chen', 'Rodriguez', 'Blackwood', 'Nakamura', 'Dupont', 'Kovacs', 'Sloane', 'Hayes', 'BinLaden'];
const CITIES = ['New Metropolis', 'Silver Creek', 'Echo Bay', 'Neo Heights', 'Oasis Springs'];
const STREETS = ['Oak Drive', 'Cyber Way', 'Maple Avenue', 'Industrial Blvd', 'Horizon Loop'];

const RESTRICTED_GROUPS = {
  GLOBAL_WATCHLIST: ['binladen', 'laden'],
  SUSPICIOUS_ACTIVITY: ['amara kovacs', 'akhila', 'manasa', 'gireeshma', 'triveni'],
  SYSTEM_DENIAL: ['rejected', 'denied', 'invalid']
};

export const generateMockDriverData = (overrideName?: string): MockDriverData => {
  const nameLower = overrideName?.toLowerCase() || '';
  
  // Determine if and why the profile is rejected
  let status: VerificationStatus = 'APPROVED';
  let rejectionReason = undefined;

  const isGlobalMatch = RESTRICTED_GROUPS.GLOBAL_WATCHLIST.some(pattern => nameLower.includes(pattern));
  const isSuspiciousMatch = RESTRICTED_GROUPS.SUSPICIOUS_ACTIVITY.some(pattern => nameLower.includes(pattern));
  const isSystemMatch = RESTRICTED_GROUPS.SYSTEM_DENIAL.some(pattern => nameLower.includes(pattern));

  if (isGlobalMatch) {
    status = 'REJECTED';
    rejectionReason = 'Identity match found in global restricted person list. High-priority law enforcement alert triggered.';
  } else if (isSuspiciousMatch) {
    status = 'REJECTED';
    rejectionReason = 'Profile flagged due to suspicious activity patterns and recorded regulatory non-compliance.';
  } else if (isSystemMatch) {
    status = 'REJECTED';
    rejectionReason = 'Verification failed: Automated systems could not establish document authenticity or identity is blacklisted.';
  }

  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const street = STREETS[Math.floor(Math.random() * STREETS.length)];
  
  const birthYear = 1970 + Math.floor(Math.random() * 35);
  const birthMonth = 1 + Math.floor(Math.random() * 12);
  const birthDay = 1 + Math.floor(Math.random() * 28);

  const phone = `+1 (555) ${Math.floor(100 + Math.random() * 899)}-${Math.floor(1000 + Math.random() * 8999)}`;
  const vehicle = `${(Math.random() + 1).toString(36).substring(7).toUpperCase()}-${Math.floor(1000 + Math.random() * 8999)}`;
  const license = `DL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const cases = status === 'REJECTED' ? 25 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 4);
  
  // If not already rejected, check for traffic case threshold to flag
  if (status === 'APPROVED' && cases > 5) {
    status = 'FLAGGED';
  }

  return {
    fullName: overrideName || `${firstName} ${lastName}`,
    address: `${Math.floor(100 + Math.random() * 8900)} ${street}, ${city}`,
    dateOfBirth: `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`,
    phoneNumber: phone,
    vehicleNumber: vehicle,
    licenseNumber: license,
    trafficCases: cases,
    status,
    rejectionReason
  };
};
