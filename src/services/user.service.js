import api from './api';

const API_URL = 'http://localhost:4000/api/v1/';

class UserService {
  getPublicContent() {
    return api.get(API_URL + 'all');
  }

  getUserBoard() {
    return api.get(API_URL + 'accounts');
  }

  getModeratorBoard() {
    return api.get(API_URL + 'mod');
  }

  getAdminBoard() {
    return api.get(API_URL + 'admin');
  }
}

export default new UserService();
