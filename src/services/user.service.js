import api from './api';
const accountEndpoint = 'accounts/';
const API_URL = 'http://localhost:4000/api/v1/';

class UserService {

  
  //departments
  getStudents() {
    return api
      .get(accountEndpoint + 'students')
      .then(response => {
        return response.data;
      });
  }

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
