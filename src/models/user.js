export const User = class User {
  constructor(firstName, lastName, email, password, confirmPassword, acceptTerms) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.acceptTerms = acceptTerms;
  }
}

export const ResetPassword = class ResetPassword {
  constructor(token, password, passwordConfirmation) {
    this.token = token;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }
}