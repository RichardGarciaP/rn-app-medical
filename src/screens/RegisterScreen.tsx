import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import { Button, Input, ErrorMessage } from '../components';

export const RegisterScreen = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await signUp({ name, email, password, role });
      router.replace('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>
            Completa el formulario de registro
          </Text>
        </View>

        <View style={styles.form}>
          {error ? <ErrorMessage message={error} /> : null}

          <Input
            label='Nombre Completo'
            value={name}
            onChangeText={setName}
            placeholder='Juan Pérez'
          />

          <Input
            label='Email'
            value={email}
            onChangeText={setEmail}
            placeholder='correo@ejemplo.com'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input
            label='Contraseña'
            value={password}
            onChangeText={setPassword}
            placeholder='••••••••'
            secureTextEntry={true}
          />

          <Input
            label='Confirmar Contraseña'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder='••••••••'
            secureTextEntry={true}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Tipo de Usuario</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={role}
                onValueChange={(value) =>
                  setRole(value as 'PATIENT' | 'DOCTOR')
                }
                style={styles.picker}
              >
                <Picker.Item label='Paciente' value='PATIENT' />
                <Picker.Item label='Doctor' value='DOCTOR' />
              </Picker>
            </View>
          </View>

          <Button
            title='Registrarse'
            onPress={handleRegister}
            loading={loading}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <Text style={styles.link} onPress={() => router.push('/login')}>
              Inicia Sesión
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
  button: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});
