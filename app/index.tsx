import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { Loading } from '../src/components';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text='Cargando...' />;
  }

  if (!user) {
    return <Redirect href='/login' />;
  }

  if (user.role === 'DOCTOR') {
    return <Redirect href='/doctor/home' />;
  }

  return <Redirect href='/patient/home' />;
}
