import { useState } from 'react';
import { User } from '../types';
import { appointmentService } from '../services/appointmentService';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await appointmentService.getAllDoctors();
      setDoctors(data);
      return data;
    } catch (err) {
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
      ];
      setDoctors(mockDoctors);
      setError('Error al cargar doctores. Usando datos de ejemplo.');
      return mockDoctors;
    } finally {
      setLoading(false);
    }
  };

  return {
    doctors,
    loading,
    error,
    loadDoctors,
  };
};
