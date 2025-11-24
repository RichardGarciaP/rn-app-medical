import { useState, useCallback } from 'react';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';

export const useAppointments = (
  userId: number,
  userType: 'patient' | 'doctor'
) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadAppointments = useCallback(async () => {
    if (!userId) return;

    try {
      setError('');
      const data =
        userType === 'patient'
          ? await appointmentService.getPatientAppointments(userId)
          : await appointmentService.getPatientAppointments(userId);
      setAppointments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las citas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId, userType]);

  const refreshAppointments = useCallback(() => {
    setRefreshing(true);
    loadAppointments();
  }, [loadAppointments]);

  const cancelAppointment = useCallback(
    async (appointmentId: number) => {
      try {
        await appointmentService.cancelAppointment(appointmentId);
        await loadAppointments();
        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          error: err.response?.data?.message || 'Error al cancelar la cita',
        };
      }
    },
    [loadAppointments]
  );

  return {
    appointments,
    loading,
    refreshing,
    error,
    loadAppointments,
    refreshAppointments,
    cancelAppointment,
  };
};
