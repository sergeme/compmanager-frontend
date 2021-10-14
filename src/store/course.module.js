import CourseService from 'services/course.service';

var courses = [];

export const course = {
  namespaced: true,
  state: courses,
  actions: {
    getCourses({ commit }) {
       return CourseService.getCourses().then(
        courses => {
          commit('getCoursesSuccess', courses);
          return Promise.resolve(courses);
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    //classes
    getCoursesSuccess(state, obj) {
      state.classes = obj;
    }
  }
};
