import api from "./api";

const departmentEndpoint = 'departments/';
const courseEndpoint = 'courses/';
const locationEndpoint = 'locations/';

class SchoolService {
  //departments
  async getDepartments() {
    const response = await api
      .get(departmentEndpoint);
    return response.data;
  }

  async addDepartment(department) {
    const response = await api
      .post(departmentEndpoint, department);
    return response.data;
  }

  async updateDepartment(department) {
    const response = await api
      .put(departmentEndpoint, department);
    return response.data;
  }

  async deleteDepartment(department) {
    const response = await api
      .delete(departmentEndpoint + department);
    return response.data;
  }

  //courses
  async addCourse(course) {
    const response = await api
      .post(courseEndpoint, course);
    return response.data;
  }

  async updateCourse(course) {
    const response = await api
      .put(courseEndpoint, course);
    return response.data;
  }

  async deleteCourse(course) {
    const response = await api
      .delete(courseEndpoint + course);
    return response.data;
  }

  //locations

  async getLocations() {
    const response = await api
      .get(locationEndpoint);
    return response.data;
  }

  async addLocation(location) {
    const response = await api
      .post(locationEndpoint, location);
    return response.data;
  }

  async addCourseLocation(location) {
    const response = await api
      .put(courseEndpoint + 'add-location', location);
    return response.data;
  }

  async updateLocation(location) {
    const response = await api
      .put(locationEndpoint, location);
    return response.data;
  }

  async deleteLocation(location) {
    const response = await api
      .delete(locationEndpoint + location);
    return response.data;
  }

  async deleteCourseLocation(location) {
    const response = await api
      .put(courseEndpoint + 'remove-location', location);
    return response.data;
  }
}

export default new SchoolService();
