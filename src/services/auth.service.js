import api from "./api";
import TokenService from "./token.service";

const API_URL = 'http://localhost:4000/api/v1/accounts/';

class AuthService {
  login(user) {
    return api
      .post(API_URL + 'authenticate', {
        email: user.email,
        password: user.password
      }/*, { withCredentials: true }*/)
      .then(response => {
        if (response.data.jwtToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(user) {
    return api.post(API_URL + 'register', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      acceptTerms: user.acceptTerms
    });
  }

  verify(token) {
    return api.post(API_URL + 'verify-email', {
      token: token
    });
  }
}

export default new AuthService();
