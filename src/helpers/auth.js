export const Authorization = class Authorization {
  constructor(user) {
    this.user = user;
  }
  hasRole(role) {
    if (this.user && this.user.role) {
      return role & this.user.role;
    }
    return false;
  }
}