import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import { User } from '../types';
import { Button, Card, ErrorMessage, Loading } from '../components';

export const NewAppointmentScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<User[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await appointmentService.getAllDoctors();
      setDoctors(data);
      if (data.length > 0) {
        setSelectedDoctor(data[0].id);
      }
    } catch (err) {
      setError('Error al cargar doctores. Usando datos de ejemplo.');
      const mockDoctors = [
        {
          id: 1,
          name: 'Dr. Juan García',
          email: 'doctor1@test.com',
          role: 'DOCTOR' as const,
        },
        {
          id: 2,
          name: 'Dra. María López',
          email: 'doctor2@test.com',
          role: 'DOCTOR' as const,
        },
      ];
      setDoctors(mockDoctors);
      setSelectedDoctor(mockDoctors[0].id);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDate(newDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const validateAppointment = (): { isValid: boolean; message?: string } => {
    if (!selectedDoctor || !user) {
      return { isValid: false, message: 'Por favor selecciona un doctor' };
    }

    const now = new Date();
    const appointmentDate = new Date(date);

    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    if (appointmentDate < oneHourFromNow) {
      return {
        isValid: false,
        message: 'La cita debe ser al menos 1 hora en el futuro',
      };
    }

    const hours = appointmentDate.getHours();
    if (hours < 8 || hours >= 18) {
      return {
        isValid: false,
        message: 'Horario de atención: 8:00 AM - 6:00 PM',
      };
    }

    const dayOfWeek = appointmentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        isValid: false,
        message: 'No se pueden agendar citas los fines de semana',
      };
    }

    const threeMonthsFromNow = new Date(
      now.getTime() + 90 * 24 * 60 * 60 * 1000
    );
    if (appointmentDate > threeMonthsFromNow) {
      return {
        isValid: false,
        message:
          'No se pueden agendar citas con más de 3 meses de anticipación',
      };
    }

    return { isValid: true };
  };

  const handleSubmit = async () => {
    const validation = validateAppointment();
    if (!validation.isValid) {
      Alert.alert('Validación', validation.message || 'Datos inválidos');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const dateTimeISO = date.toISOString().slice(0, -1);

      await appointmentService.createAppointment({
        doctorId: selectedDoctor!,
        patientId: user!.id,
        dateTime: dateTimeISO,
      });

      if (Platform.OS === 'android') {
        ToastAndroid.show('✅ Cita agendada correctamente', ToastAndroid.LONG);
      }

      navigation.navigate('PatientHome', { refresh: true });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Error al agendar la cita. Por favor intenta nuevamente.';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading text='Cargando doctores...' />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nueva Cita Médica</Text>

        {error ? <ErrorMessage message={error} /> : null}

        <Card>
          <Text style={styles.label}>Selecciona un Doctor</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDoctor}
              onValueChange={(value) => setSelectedDoctor(value)}
              style={styles.picker}
            >
              {doctors.map((doctor) => (
                <Picker.Item
                  key={doctor.id}
                  label={doctor.name}
                  value={doctor.id}
                />
              ))}
            </Picker>
          </View>
        </Card>

        <Card>
          <Text style={styles.label}>Fecha</Text>
          <Button
            title={date.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            onPress={() => setShowDatePicker(true)}
            variant='secondary'
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode='date'
              display='default'
              onChange={handleDateChange}
              minimumDate={new Date()}
              maximumDate={
                new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)
              }
            />
          )}
          <Text style={styles.helperText}>Lunes a Viernes, máximo 3 meses</Text>
        </Card>

        <Card>
          <Text style={styles.label}>Hora</Text>
          <Button
            title={date.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onPress={() => setShowTimePicker(true)}
            variant='secondary'
          />
          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode='time'
              display='default'
              onChange={handleTimeChange}
            />
          )}
          <Text style={styles.helperText}>
            Horario de atención: 8:00 AM - 6:00 PM
          </Text>
        </Card>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen</Text>
          <Text style={styles.summaryText}>
            Doctor: {doctors.find((d) => d.id === selectedDoctor)?.name}
          </Text>
          <Text style={styles.summaryText}>
            Fecha: {date.toLocaleDateString('es-ES')}
          </Text>
          <Text style={styles.summaryText}>
            Hora:{' '}
            {date.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </Card>

        <Button
          title='Agendar Cita'
          onPress={handleSubmit}
          loading={submitting}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  summaryCard: {
    backgroundColor: '#E3F2FD',
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
