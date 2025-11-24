import useSWR from 'swr';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';

const fetcher = async (
  url: string,
  userId: number,
  userType: 'patient' | 'doctor'
) => {
  return userType === 'patient'
    ? await appointmentService.getPatientAppointments(userId)
    : await appointmentService.getPatientAppointments(userId);
};

export const useAppointments = (
  userId: number,
  userType: 'patient' | 'doctor'
) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    Appointment[]
  >(
    userId ? [`/appointments/${userType}/${userId}`, userId, userType] : null,
    ([url, id, type]: [string, number, 'patient' | 'doctor']) =>
      fetcher(url, id, type),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000,
      dedupingInterval: 2000,
    }
  );

  const cancelAppointment = async (appointmentId: number) => {
    try {
      await mutate(
        async (currentData) => {
          await appointmentService.cancelAppointment(appointmentId);
          return currentData?.filter((apt) => apt.id !== appointmentId);
        },
        {
          optimisticData: data?.filter((apt) => apt.id !== appointmentId),
          rollbackOnError: true,
          revalidate: true,
        }
      );
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || 'Error al cancelar la cita',
      };
    }
  };

  return {
    appointments: data || [],
    loading: isLoading,
    refreshing: isValidating,
    error: error?.message || '',
    loadAppointments: () => mutate(),
    refreshAppointments: () => mutate(),
    cancelAppointment,
  };
};
