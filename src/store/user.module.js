import UserService from 'services/user.service';

var students = [];
var teachers = [];

export const user = {
  namespaced: true,
  state: {
    students,
    teachers
  },
  actions: {
    getStudents({ commit }) {
      return UserService.getStudents().then(
        students => {
          commit('getStudentsSuccess', students);
          return Promise.resolve(students);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
  },
  mutations: {
    //students
    getStudentsSuccess(state, students) {
      state.students = students;
    }
  }
};
