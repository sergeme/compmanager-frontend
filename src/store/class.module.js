import ClassService from 'services/class.service';

var classes = [];
var courses = [];


export const schoolClass = {
  namespaced: true,
  state: {
    classes,
    courses},
  actions: {
    //classes
    getClasses({ commit }) {
      return ClassService.getClasses().then(
        classes => {
          commit('getClassesSuccess', classes);
          return Promise.resolve(classes);
        },
        error => {
          commit('getClassesFailure');
          return Promise.resolve(error);
        }
      )
    },
    getClassesByLocationAndCourse({ commit }, obj) {
      return ClassService.getClassesByLocationAndCourse(obj).then(
        classes => {
          commit('getClassesByLocationAndCourseSuccess', {
            locationId: obj.locationId,
            courseId: obj.courseId,
            classes: classes
          });
          return Promise.resolve(classes);
        },
        error => {
          commit('getClassesByLocationAndCourseFailure');
          return Promise.resolve(error);
        }
      )
    },
    addClass({ commit }, newClass) {
      return ClassService.addClass(newClass).then(
        classObj => {
          commit('addClassSuccess', classObj);
          return Promise.resolve(classObj);
        },
        error => {
          return Promise.resolve(error);
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
          return Promise.resolve(error);
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
          return Promise.resolve(error);
        }
      )
    },
    //accounts / students
    //existing -> add to course
    addClassStudent({ commit }, newLocation) {
      return ClassService.addClassStudent(newLocation.location).then(
        location => {
          commit('addClassStudentSuccess', {
            classObjId: newLocation.classObjId,
            courseId: newLocation.location.courseId,
            location: location
          });
          return Promise.resolve(location);
        },
        error => {
          return Promise.resolve(error);
        }
      )
    },
    //remove from course
    deleteClassStudent({ commit }, deleteLocation) {
      return ClassService.removeClassStudent({
        courseId: deleteLocation.courseId,
        locationId: deleteLocation.locationId
      }).then(
        () => {
          commit('removeClassStudentSuccess', deleteLocation);
          return Promise.resolve();
        },
        error => {
          return Promise.resolve(error);
        }
      )
    }
  },
  mutations: {
    //classes
    getClassesSuccess(state, classes) {
      state.classes = classes;
    },
    getClassesFailure(state) {
      state.classes = null;
    },
    getClassesByLocationAndCourseSuccess(state, obj) {
      var classes = obj.classes;
      var location = { id: obj.locationId, classes: classes };
      var course = {id: obj.courseId, locations: []};
      course.locations.push(location);
      state.courses[obj.courseId] = course;
    },
    getClassesByLocationAndCourseFailure(state) {
      state.classes = null;
    },
    addClassesSuccess(state, classObj) {
      classObj.forEach(function (item) {
        state.classes.push(item);
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
    addClassStudentSuccess(state) {
      const classObj = state.classes.map(item => item.id).indexOf(location.classObjId);
      const course = state.classes[classObj].courses.map(item => item.id).indexOf(location.courseId);
      state.classes[classObj].courses[course].locations.push(location.location);
      state.locations.push(location.location)

    },
    removeClassStudentSuccess() {
      
    }
  }
};
