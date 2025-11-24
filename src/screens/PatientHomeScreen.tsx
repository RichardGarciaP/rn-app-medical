import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import { Appointment } from '../types';
import { Card, Button, Loading, ErrorMessage } from '../components';

export const PatientHomeScreen = () => {
  const router = useRouter();
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

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAppointments();
  }, []);

  const handleCancelAppointment = (appointmentId: number) => {
    Alert.alert(
      'Cancelar Cita',
      '¿Estás seguro de que deseas cancelar esta cita?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, Cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              await appointmentService.cancelAppointment(appointmentId);
              Alert.alert('Éxito', 'Cita cancelada correctamente');
              loadAppointments();
            } catch (err: any) {
              Alert.alert(
                'Error',
                err.response?.data?.message || 'Error al cancelar la cita'
              );
            }
          },
        },
      ]
    );
  };

  const renderAppointment = ({ item }: { item: Appointment }) => {
    const date = new Date(item.dateTime);
    const isCanceled = item.status === 'CANCELED';

    return (
      <Card>
        <View style={styles.appointmentHeader}>
          <Text style={styles.doctorName}>
            Dr. {item.doctor?.name || item.doctorName}
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

        {!isCanceled && (
          <Button
            title='Cancelar Cita'
            variant='danger'
            onPress={() => handleCancelAppointment(item.id)}
            style={styles.cancelButton}
          />
        )}
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
          <Text style={styles.greeting}>Hola, {user?.name}! 👋</Text>
          <Text style={styles.role}>Paciente</Text>
        </View>
        <Button title='Salir' variant='secondary' onPress={signOut} />
      </View>

      {error ? <ErrorMessage message={error} /> : null}

      <View style={styles.actions}>
        <Button
          title='➕ Nueva Cita'
          onPress={() => router.push('/patient/new-appointment')}
        />
      </View>

      <Text style={styles.sectionTitle}>Mis Citas</Text>

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
            <Text style={styles.emptySubtext}>
              Presiona "Nueva Cita" para agendar una
            </Text>
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
  actions: {
    marginBottom: 20,
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
  doctorName: {
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
    marginBottom: 12,
  },
  cancelButton: {
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  emptyList: {
    flexGrow: 1,
  },
});
