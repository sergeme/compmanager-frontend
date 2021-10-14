import api from "./api";

const courseEndpoint = 'courses/';

class CourseService {
  async getCourses() {
    const response = await api
      .get(courseEndpoint);
    return response.data;
  }
}

export default new CourseService();
