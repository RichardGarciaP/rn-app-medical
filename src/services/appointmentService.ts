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

  // Obtener todos los doctores (necesario para crear citas)
  getAllDoctors: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/user/doctors');
      console.log('Doctores cargados desde API:', response.data.length);
      return response.data;
    } catch (error: any) {
      console.warn('Endpoint /user/doctors no disponible, usando datos mock');
      console.warn('Error:', error.response?.status || error.message);

      // Mock data para desarrollo/testing
      // TODO: Implementar endpoint en backend
      const mockDoctors: User[] = [
        {
          id: 1,
          name: 'Dr. Juan García',
          email: 'doctor1@test.com',
          role: 'DOCTOR',
        },
        {
          id: 2,
          name: 'Dra. María López',
          email: 'doctor2@test.com',
          role: 'DOCTOR',
        },
        {
          id: 3,
          name: 'Dr. Carlos Ruiz',
          email: 'doctor3@test.com',
          role: 'DOCTOR',
        },
      ];

      return mockDoctors;
    }
  },
};
