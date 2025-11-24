import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { User, LoginRequest, RegisterRequest } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: LoginRequest) => Promise<void>;
  signUp: (data: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading storage data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(data: LoginRequest) {
    try {
      console.log('Intentando login con:', { email: data.email });
      const response = await authService.login(data);
      console.log('Login exitoso:', response);

      const userData: User = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
      };

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', response.token);
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión';

      if (error.code === 'ERR_NETWORK' || error.message.includes('Network')) {
        errorMessage =
          'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://192.168.1.3:8080';
      } else if (error.response?.status === 401) {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (error.response?.status === 404) {
        errorMessage = 'Usuario no encontrado. ¿Necesitas registrarte?';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      throw new Error(errorMessage);
    }
  }

  async function signUp(data: RegisterRequest) {
    try {
      await authService.register(data);
      await signIn({ email: data.email, password: data.password });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al registrarse');
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
