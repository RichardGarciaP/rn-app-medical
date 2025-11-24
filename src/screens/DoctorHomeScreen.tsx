import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';
import { Card, Button, Loading, ErrorMessage } from '../components';

export const DoctorHomeScreen = () => {
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadAppointments = async () => {
    if (!user) return;

    try {
      setError('');
      const data = await appointmentService.getPatientAppointments(user.id);
      setAppointments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las citas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAppointments();
  }, []);

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const date = new Date(item.dateTime);
    const isCanceled = item.status === 'CANCELED';

    return (
      <Card>
        <View style={styles.appointmentHeader}>
          <Text style={styles.patientName}>
            Paciente: {item.patient?.name || item.patientName}
          </Text>
          <View
            style={[
              styles.statusBadge,
              isCanceled ? styles.canceledBadge : styles.activeBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {isCanceled ? 'Cancelada' : 'Activa'}
            </Text>
          </View>
        </View>

        <Text style={styles.dateTime}>
          📅{' '}
          {date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.time}>
          🕐{' '}
          {date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Card>
    );
  };

  if (loading) {
    return <Loading text='Cargando citas...' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, {user?.name}! 👨‍⚕️</Text>
          <Text style={styles.role}>Doctor</Text>
        </View>
        <Button title='Salir' variant='secondary' onPress={signOut} />
      </View>

      {error ? <ErrorMessage message={error} /> : null}

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>
            {appointments.filter((a) => a.status === 'ACTIVE').length}
          </Text>
          <Text style={styles.statLabel}>Citas Activas</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>
            {appointments.filter((a) => a.status === 'CANCELED').length}
          </Text>
          <Text style={styles.statLabel}>Canceladas</Text>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Mis Citas Programadas</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes citas programadas</Text>
          </View>
        }
        contentContainerStyle={
          appointments.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
  },
  canceledBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  emptyList: {
    flexGrow: 1,
  },
});
