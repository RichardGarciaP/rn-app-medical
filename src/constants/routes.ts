export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PATIENT: {
    HOME: '/patient/home',
    NEW_APPOINTMENT: '/patient/new-appointment',
  },
  DOCTOR: {
    HOME: '/doctor/home',
  },
  ROOT: '/',
} as const;
