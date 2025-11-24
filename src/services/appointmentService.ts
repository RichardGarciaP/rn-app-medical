import api from './api';
import { Appointment, CreateAppointmentRequest, User } from '../types';

export const appointmentService = {
  // Obtener citas de un paciente
  getPatientAppointments: async (patientId: number): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>(
      `/appointments/patient/${patientId}`
    );
    return response.data;
  },

  // Obtener citas de un paciente con paginación
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

  // Crear una cita
  createAppointment: async (
    data: CreateAppointmentRequest
  ): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', data);
    return response.data;
  },

  // Cancelar una cita
  cancelAppointment: async (appointmentId: number): Promise<void> => {
    await api.patch(`/appointments/${appointmentId}/cancel`);
  },

  // Obtener todos los doctores
  getAllDoctors: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/user/doctors');
    return response.data;
  },
};
