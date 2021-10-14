import api from "./api";

const classEndpoint = 'classes/';

class ClassService {
  async getClasses() {
    const response = await api
      .get(classEndpoint);
    return response.data;
  }

  async addClasses(classObj) {
    const response = await api
      .post(classEndpoint, classObj);
    return response.data;
  }

  async updateClass(classObj) {
    const response = await api
      .put(classEndpoint, classObj);
    return response.data;
  }

  async deleteClass(classObj) {
    const response = await api
      .delete(classEndpoint + classObj);
    return response.data;
  }
  //students / accounts
  async addClassStudent(obj) {
    const response = await api
      .put(classEndpoint + 'add-student', obj);
    return response.data;
  }

  async removeClassStudent(obj) {
    const response = await api
      .put(classEndpoint + 'remove-student', obj);
    return response.data;
  }
}

export default new ClassService();
