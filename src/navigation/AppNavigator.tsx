import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Loading } from '../components';

// Auth Screens
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

// Patient Screens
import { PatientHomeScreen } from '../screens/PatientHomeScreen';
import { NewAppointmentScreen } from '../screens/NewAppointmentScreen';

// Doctor Screens
import { DoctorHomeScreen } from '../screens/DoctorHomeScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
  },
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
  </Stack.Navigator>
);

const PatientStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={PatientHomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='NewAppointment'
      component={NewAppointmentScreen}
      options={{
        title: 'Nueva Cita',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' as const },
      }}
    />
  </Stack.Navigator>
);

const DoctorStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={DoctorHomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading text='Cargando...' />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      {!user ? (
        <AuthStack />
      ) : user.role === 'DOCTOR' ? (
        <DoctorStack />
      ) : (
        <PatientStack />
      )}
    </NavigationContainer>
  );
};
