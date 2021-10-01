import SchoolService from '../services/school.service';

const school = JSON.parse(localStorage.getItem('school'));
const initialState = school

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    verify({ commit }, token) {
      return AuthService.verify(token).then(
        response => {
          commit('verificationSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('verificationFailure');
          return Promise.reject(error);
        }
      )
    },
    refreshToken({ commit }) {
      commit('refreshToken');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    verificationSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, jwtToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, jwtToken: jwtToken };
    }
  }
};