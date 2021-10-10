import LocationService from 'services/location.service';

//ordered list by course/location
var locations = [];

export const location = {
  namespaced: true,
  state: locations,
  actions: {
    getLocations({ commit }) {
      return LocationService.getLocations().then(
        locations => {
          commit('getLocationsSuccess');
          return Promise.resolve(locations);
        },
        error => {
          commit('getLocationsFailure');
          return Promise.reject(error);
        }
      )
    },
    addLocations({ commit }, obj) {
      return LocationService.addLocations(obj.locations).then(
        location => {
          commit('addLocationsSuccess');
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateLocation({ commit }, editLocation) {
      return LocationService.updateLocation(editLocation).then(
        location => {
          commit('updateLocationSuccess', location);
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteLocation({ commit }, deleteLocation) {
      return LocationService.deleteLocation(deleteLocation).then(
        () => {
          commit('deleteLocationSuccess', deleteLocation);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //accounts / students
    //existing -> add to class
    addLocationStudent({ commit }, obj) {
      return LocationService.addLocationStudent(obj).then(
        location => {
          commit('changeLocationStudentSuccess', location);
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    //remove from class
    removeLocationStudent({ commit }, obj) {
      return LocationService.removeLocationStudent(obj).then(
        location => {
          commit('changeLocationStudentSuccess', location);
          return Promise.resolve(location);
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    //locations
    getLocationsSuccess(state, obj) {
      state.locations = obj;
    },
    updateLocationSuccess(state, location) {
      state.locations[state.locations.findIndex(d => d.id == location.id)].name = location.name;
    },
    deleteLocationSuccess(state, id) {
      const i = state.locations.map(item => item.id).indexOf(id);
      state.locations.splice(i, 1);
    },
    //students
    changeLocationStudentSuccess(state, obj) {
      console.log(JSON.stringify(state.courses))
      var location = state.courses[obj.courseId].locations.findIndex(l => l.id == obj.locationId)
      var location = state.courses[obj.courseId].locations[location].locations.findIndex(cl => cl.id == obj.id)
      state.courses[obj.courseId].locations[location].locations[location]= obj
    }
  }
};
