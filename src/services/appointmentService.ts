import api from './api';
import { Appointment, CreateAppointmentRequest, User } from '../types';

export const appointmentService = {
  getPatientAppointments: async (patientId: number): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>(
      `/appointments/patient/${patientId}`
    );
    return response.data;
  },

  getPatientAppointmentsPaginated: async (
    patientId: number,
    page: number = 0,
    size: number = 10
  ) => {
    const response = await api.get(
      `/appointments/patient/${patientId}/paginated`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  createAppointment: async (
    data: CreateAppointmentRequest
  ): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data;
  },

  cancelAppointment: async (appointmentId: number): Promise<void> => {
    await api.patch(`/appointments/${appointmentId}/cancel`);
  },

  getAllDoctors: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/user/doctors');
    return response.data;
  },
};
