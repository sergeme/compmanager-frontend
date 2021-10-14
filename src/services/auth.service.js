import api from "./api";
import TokenService from "./token.service";

const accountEndpoint = 'accounts';

class AuthService {
  async login(user) {
    const response = await api
      .post(accountEndpoint + '/authenticate', {
        email: user.email,
        password: user.password
      }, { withCredentials: true });
    if (response.data.jwtToken) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  logout() {
    TokenService.removeUser();
  }

  register(user) {
    api.post(accountEndpoint+'/register', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      acceptTerms: user.acceptTerms,
      classId: user.classId
    });
  }

  verify(token) {
    return api.post(accountEndpoint+'/verify-email', {
      token: token
    });
  }

  forgotPassword(email) {
    return api.post(accountEndpoint+'/forgot-password', {
      email: email
    });
  }

  resetPassword(payload) {
    console.log(JSON.stringify(payload))
    return api.post(accountEndpoint+'/reset-password', {
      token: payload.token,
      password: payload.password,
      confirmPassword: payload.passwordConfirmation
    });
  }
}

export default new AuthService();
