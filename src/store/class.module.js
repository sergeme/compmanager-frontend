import ClassService from 'services/class.service';

//ordered list by course/location
var classes = [];

export const schoolClass = {
  namespaced: true,
  state: classes,
  actions: {
    getClasses({ commit }) {
      return ClassService.getClasses().then(
        classes => {
          commit('getClassesSuccess', classes);
          return Promise.resolve(classes);
        },
        error => {
          commit('getClassesFailure');
          return Promise.reject(error);
        }
      )
    },
    addClasses({ commit }, obj) {
      return ClassService.addClasses(obj.classes).then(
        classes => {
          commit('addClassesSuccess', classes);
          return Promise.resolve(classes);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateClass({ commit }, editClass) {
      return ClassService.updateClass(editClass).then(
        classObj => {
          commit('updateClassSuccess', classObj);
          return Promise.resolve(classObj);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteClass({ commit }, deleteClass) {
      return ClassService.deleteClass(deleteClass).then(
        () => {
          commit('deleteClassSuccess', deleteClass);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //accounts / students
    //existing -> add to class
    addClassStudent({ commit }, obj) {
      return ClassService.addClassStudent(obj).then(
        classObj => {
          commit('changeClassStudentSuccess', classObj);
          return Promise.resolve(classObj);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //remove from class
    removeClassStudent({ commit }, obj) {
      return ClassService.removeClassStudent(obj).then(
        classObj => {
          commit('changeClassStudentSuccess', classObj);
          return Promise.resolve(classObj);
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    //classes
    getClassesSuccess(state, obj) {
      state.classes = obj;
    },
    addClassesSuccess(state, obj) {
      obj.forEach(function (classObj)
      {
        state.classes.push(classObj)
      })
    },
    updateClassSuccess(state, classObj) {
      state.classes[state.classes.findIndex(d => d.id == classObj.id)].name = classObj.name;
    },
    deleteClassSuccess(state, id) {
      const i = state.classes.map(item => item.id).indexOf(id);
      state.classes.splice(i, 1);
    },
    //students
    changeClassStudentSuccess(state, obj) {
      state.classes[state.classes.findIndex(d => d.id == obj.id)] = obj;
    }
  }
};
