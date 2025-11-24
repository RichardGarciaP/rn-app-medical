import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants';

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  if (name.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return ERROR_MESSAGES.NAME_TOO_SHORT;
  }
  return null;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
  }
  return null;
};
