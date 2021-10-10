import SchoolService from '../services/school.service';

const departments = []
const locations = []

export const school = {
  namespaced: true,
  state: {
    departments,
    locations
  },
  actions: {
    //departments
    getDepartments({ commit }) {
      return SchoolService.getDepartments().then(
        departments => {
          commit('getDepartmentsSuccess', departments);
          return Promise.resolve(departments);
        },
        error => {
          commit('getGepartmentsFailure');
          return Promise.reject(error);
        }
      )
    },
    addDepartment({ commit }, newDepartment) {
      return SchoolService.addDepartment(newDepartment).then(
        department => {
          commit('addDepartmentSuccess', department);
          return Promise.resolve(department);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateDepartment({ commit }, editDepartment) {
      return SchoolService.updateDepartment(editDepartment).then(
        department => {
          commit('updateDepartmentSuccess', department);
          return Promise.resolve(department);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteDepartment({ commit }, deleteDepartment) {
      return SchoolService.deleteDepartment(deleteDepartment).then(
        () => {
          commit('deleteDepartmentSuccess', deleteDepartment);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //courses
    addCourse({ commit }, newCourse) {
      return SchoolService.addCourse(newCourse).then(
        course => {
          commit('addCourseSuccess', { newCourse: newCourse, course: course });
          return Promise.resolve(course);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateCourse({ commit }, editCourse) {
      return SchoolService.updateCourse(editCourse.course).then(
        course => {
          commit('updateCourseSuccess', {departmentId: editCourse.departmentId, course: course});
          return Promise.resolve(course);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteCourse({ commit }, deleteCourse) {
      return SchoolService.deleteCourse(deleteCourse.courseId).then(
        () => {
          commit('deleteCourseSuccess', deleteCourse);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //locations
    getLocations({ commit }) {
      return SchoolService.getLocations().then(
        locations => {
          commit('getLocationsSuccess', locations);
          return Promise.resolve(locations);
        },
        error => {
          commit('getLocationsFailure');
          return Promise.reject(error);
        }
      )
    },
    //newly created location
    addLocation({ commit }, newLocation) {
      return SchoolService.addLocation(newLocation.location).then(
        location => {
          commit('addLocationSuccess', {
            departmentId: newLocation.departmentId,
            courseId: newLocation.courseId,
            location: location
          });
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //existing -> add to course
    addCourseLocation({ commit }, newLocation) {
      return SchoolService.addCourseLocation(newLocation.location).then(
        location => {
          commit('addCourseLocationSuccess', {
            departmentId: newLocation.departmentId,
            courseId: newLocation.location.courseId,
            location: location
          });
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateLocation({ commit }, editLocation) {
      return SchoolService.updateLocation(editLocation.location).then(
        location => {
          commit('updateLocationSuccess', {
            departmentId: editLocation.departmentId,
            courseId: editLocation.courseId,
            location: location
          });
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //remove entirely
    deleteLocation({ commit }, deleteLocation) {
      console.log(JSON.stringify(deleteLocation))
      return SchoolService.deleteLocation(deleteLocation.locationId).then(
        () => {commit('deleteLocationSuccess', {
          courseId: deleteLocation.courseId,
          departmentId: deleteLocation.departmentId,
          locationId: deleteLocation.locationId
      });
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //remove from course
    deleteCourseLocation({ commit }, deleteLocation) {
      return SchoolService.deleteCourseLocation({
        courseId: deleteLocation.courseId,
        locationId: deleteLocation.locationId
      }).then(
        () => {
          commit('deleteCourseLocationSuccess', deleteLocation);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  
  },
  mutations: {
    //departments
    getDepartmentsSuccess(state, departments) {
      state.departments = departments;
    },
    getGepartmentsFailure(state) {
      state.departments = null;
    },
    addDepartmentSuccess(state, department) {
      state.departments.push(department);
    },
    updateDepartmentSuccess(state, department) {
      state.departments[state.departments.findIndex(d => d.id == department.id)].name = department.name;
    },
    deleteDepartmentSuccess(state, id) {
      const i = state.departments.map(item => item.id).indexOf(id);
      state.departments.splice(i, 1);
    },
    //courses
    addCourseSuccess(state, {newCourse, course}) {
      const i = state.departments.map(item => item.id).indexOf(newCourse.departmentId);
      state.departments[i].courses.push(course);
    },
    updateCourseSuccess(state, editCourse) {
      const department = state.departments.map(item => item.id).indexOf(editCourse.departmentId);
      const course = state.departments[department].courses.map(item => item.id).indexOf(editCourse.course.id);
      state.departments[department].courses[course].name = editCourse.course.name;
    },
    deleteCourseSuccess(state, deleteCourse) {
      const department = state.departments.map(item => item.id).indexOf(deleteCourse.departmentId);
      const course = state.departments[department].courses.map(item => item.id).indexOf(deleteCourse.courseId);
      state.departments[department].courses.splice(course, 1);
    },
    //locations
    getLocationsSuccess(state, locations) {
      state.locations = locations;
    },
    getLocationsFailure(state) {
      state.locations = null;
    },
    addLocationSuccess(state, location) {
      const department = state.departments.map(item => item.id).indexOf(location.departmentId);
      const course = state.departments[department].courses.map(item => item.id).indexOf(location.courseId);
      state.departments[department].courses[course].locations.push(location.location);
      state.locations.push(location.location)

    },
    addCourseLocationSuccess(state, location) {
      const department = state.departments.map(item => item.id).indexOf(location.departmentId);
      const course = state.departments[department].courses.map(item => item.id).indexOf(location.courseId);
      state.departments[department].courses[course].locations.push(location.location);
    },

    updateLocationSuccess(state, editLocation) {
      state.departments.forEach(function (department) {
        department.courses.forEach(function (course) {
          course.locations.forEach(function (location, index, locationArr) {
            if (location.id == editLocation.location.id) {
              locationArr[index].name = editLocation.location.name;
            }
          })
        })
      })
      const location = state.locations.map(item => item.id).indexOf(editLocation.location.id);
      console.log(editLocation.location.id)
      console.log(state.locations.map(item => item.id))
      state.locations.splice(location, 1);
    },
    deleteCourseLocationSuccess(state, deleteLocation) {
      const department = state.departments.map(item => item.id).indexOf(deleteLocation.departmentId);
      const course = state.departments[department].courses.map(item => item.id).indexOf(deleteLocation.courseId);
      const location = state.departments[department].courses[course].locations.map(item => item.id).indexOf(deleteLocation.locationId);
      state.departments[department].courses[course].locations.splice(location, 1);
    },
    deleteLocationSuccess(state, deleteLocation) {
      state.departments.forEach(function (department) {
        department.courses.forEach(function (course) {
          course.locations.forEach(function (location, index, locationArr) {
            if (location.id == deleteLocation.locationId) {
              locationArr.splice(index, 1);
            }
          })
        })
      })
      const location = state.locations.map(item => item.id).indexOf(deleteLocation.locationId);
      state.locations.splice(location, 1);
    }
  }
};
