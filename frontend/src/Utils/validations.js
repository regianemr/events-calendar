const validateEmail = (email) => {
  return email?.toString().includes('@') && email?.toString().includes('.')
}

const validatePassword = (password) => {
  return password?.toString().length >= 8
}

const validateConfirmPassword = (password, confirmPassword) => {
  return validatePassword(password) && password === confirmPassword
}

const validateName = (name) => {
  return name?.toString().length >= 3
}

export { validateConfirmPassword, validateEmail, validateName, validatePassword }

