import { APPOINTMENT_RULES, ERROR_MESSAGES } from '../constants';

export const validateAppointmentDate = (
  date: Date
): { isValid: boolean; message?: string } => {
  const now = new Date();
  const appointmentDate = new Date(date);

  const hoursDifference =
    (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursDifference < APPOINTMENT_RULES.MIN_HOURS_ADVANCE) {
    return {
      isValid: false,
      message: ERROR_MESSAGES.APPOINTMENT_TOO_SOON,
    };
  }

  const hours = appointmentDate.getHours();
  if (
    hours < APPOINTMENT_RULES.WORK_HOURS.START ||
    hours >= APPOINTMENT_RULES.WORK_HOURS.END
  ) {
    return {
      isValid: false,
      message: ERROR_MESSAGES.INVALID_WORK_HOURS,
    };
  }

  const dayOfWeek = appointmentDate.getDay();
  if (
    dayOfWeek < APPOINTMENT_RULES.WORK_DAYS.MIN ||
    dayOfWeek > APPOINTMENT_RULES.WORK_DAYS.MAX
  ) {
    return {
      isValid: false,
      message: ERROR_MESSAGES.WEEKEND_NOT_ALLOWED,
    };
  }

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + APPOINTMENT_RULES.MAX_MONTHS_ADVANCE);
  if (appointmentDate > maxDate) {
    return {
      isValid: false,
      message: ERROR_MESSAGES.APPOINTMENT_TOO_FAR,
    };
  }

  return { isValid: true };
};
