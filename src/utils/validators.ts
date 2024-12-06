interface ValidationResult {
  error: boolean;
  helperText: string | null;
}

function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    return { error: true, helperText: 'O campo e-mail é obrigatório' };
  }
  if (!emailRegex.test(email)) {
    return { error: true, helperText: 'E-mail inválido' };
  }
  return { error: false, helperText: null };
}

function validPassword(password: string): ValidationResult {
  if (password === '') {
    return { error: true, helperText: 'O campo senha é obrigatório' };
  }
  if (password.length > 5) {
    return { error: false, helperText: null };
  }
  return {
    error: true,
    helperText: 'A senha precisa ter 6 ou mais caractéres.',
  };
}

export { validateEmail, validPassword };
