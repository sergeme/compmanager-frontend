import api from "./api";

const classEndpoint = 'classes/';

class ClassService {
  getClasses() {
    return api
      .get(classEndpoint)
      .then(response => {
        return response.data;
      });
  }

  getClassesByLocationAndCourse(obj) {
    return api
      .post(classEndpoint + 'by-location-and-course', obj)
      .then(response => {
        return response.data;
      });
  }

  addClass(classObj) {
    return api
      .post(classEndpoint, classObj)
      .then(response => {
        return response.data;
      });
  }

  updateClass(classObj) {
    return api
      .put(classEndpoint, classObj)
      .then(response => {
        return response.data;
      });
  }

  deleteClass(classObj) {
    return api
      .delete(classEndpoint + classObj)
      .then(response => {
        return response.data;
      });
  }
  //students / accounts
  addClassStudent(obj) {
    return api
      .put(classEndpoint+'add-student', obj)
      .then(response => {
        return response.data;
      });
  }

  removeClassStudent(obj) {
    return api
      .put(classEndpoint+'remove-student', obj)
      .then(response => {
        return response.data;
      });
  }
}

export default new ClassService();
