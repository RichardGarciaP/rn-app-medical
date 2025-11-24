import { Stack } from 'expo-router';

export default function PatientLayout() {
  return (
    <Stack>
      <Stack.Screen name='home' options={{ headerShown: false }} />
      <Stack.Screen
        name='new-appointment'
        options={{
          title: 'Nueva Cita',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  );
}
