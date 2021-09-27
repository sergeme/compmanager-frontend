export default class User {
  constructor(firstName, lastName, email, password, confirmPassword, acceptTerms) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.acceptTerms = acceptTerms;
  }
}
