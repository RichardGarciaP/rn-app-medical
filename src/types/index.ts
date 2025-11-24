export interface User {
  id: number;
  name: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: 'PATIENT' | 'DOCTOR';
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'PATIENT' | 'DOCTOR';
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: string;
}

export interface Appointment {
  id: number;
  dateTime: string;
  status: 'ACTIVE' | 'CANCELED';
  patient?: User;
  doctor?: User;
  patientName?: string;
  doctorName?: string;
}

export interface CreateAppointmentRequest {
  doctorId: number;
  patientId: number;
  dateTime: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  message: string;
  errors?: Record<string, string>;
}
