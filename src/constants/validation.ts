export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const APPOINTMENT_RULES = {
  MIN_HOURS_ADVANCE: 1,
  MAX_MONTHS_ADVANCE: 3,
  WORK_HOURS: {
    START: 8,
    END: 18,
  },
  WORK_DAYS: {
    MIN: 1,
    MAX: 5,
  },
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Email inválido',
  PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 6 caracteres',
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres',
  APPOINTMENT_TOO_SOON: 'La cita debe ser al menos 1 hora en el futuro',
  APPOINTMENT_TOO_FAR:
    'No se pueden agendar citas con más de 3 meses de anticipación',
  INVALID_WORK_HOURS: 'Horario de atención: 8:00 AM - 6:00 PM',
  WEEKEND_NOT_ALLOWED: 'No se pueden agendar citas los fines de semana',
} as const;
