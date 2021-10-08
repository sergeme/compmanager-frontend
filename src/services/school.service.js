import api from "./api";

const departmentEndpoint = 'departments/';
const courseEndpoint = 'courses/';
const locationEndpoint = 'locations/';

class SchoolService {
  //departments
  getDepartments() {
    return api
      .get(departmentEndpoint)
      .then(response => {
        return response.data;
      });
  }

  addDepartment(department) {
    return api
      .post(departmentEndpoint, department)
      .then(response => {
        return response.data;
      });
  }

  updateDepartment(department) {
    return api
      .put(departmentEndpoint, department)
      .then(response => {
        return response.data;
      });
  }

  deleteDepartment(department) {
    return api
      .delete(departmentEndpoint + department)
      .then(response => {
        return response.data;
      });
  }

  //courses
  addCourse(course) {
    return api
      .post(courseEndpoint, course)
      .then(response => {
        return response.data;
      });
  }

  updateCourse(course) {
    return api
      .put(courseEndpoint, course)
      .then(response => {
        return response.data;
      });
  }

  deleteCourse(course) {
    return api
      .delete(courseEndpoint + course)
      .then(response => {
        return response.data;
      });
  }

  //locations

  getLocations() {
    return api
      .get(locationEndpoint)
      .then(response => {
        return response.data;
      });
  }

  addLocation(location) {
    return api
      .post(locationEndpoint, location)
      .then(response => {
        return response.data;
      });
  }

  addCourseLocation(location) {
    return api
      .put(courseEndpoint+'add-location', location)
      .then(response => {
        return response.data;
      });
  }

  updateLocation(location) {
    return api
      .put(locationEndpoint, location)
      .then(response => {
        return response.data;
      });
  }

  deleteLocation(location) {
    return api
      .delete(locationEndpoint + location)
      .then(response => {
        return response.data;
      });
  }

  deleteCourseLocation(location) {
    return api
      .put(courseEndpoint+'remove-location', location)
      .then(response => {
        return response.data;
      });
  }
}

export default new SchoolService();
