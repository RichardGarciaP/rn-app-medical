import useSWR from 'swr';
import { User } from '../types';
import { appointmentService } from '../services/appointmentService';

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

const fetcher = async () => {
  try {
    return await appointmentService.getAllDoctors();
  } catch (err) {
    return mockDoctors;
  }
};

export const useDoctors = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    '/users/doctors',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      fallbackData: mockDoctors,
    }
  );

  return {
    doctors: data || mockDoctors,
    loading: isLoading,
    error: error?.message || '',
    loadDoctors: () => mutate(),
  };
};
