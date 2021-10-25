import TagService from 'services/tag.service';

export const tags = {
  namespaced: true,
  state: [],
  actions: {
    getTags({ commit }) {
       return TagService.getTags().then(
        tags => {
          commit('getTagsSuccess', tags);
          return Promise.resolve(tags);
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    //classes
    getTagsSuccess(state, obj) {
      state.splice(0, state.length);
      obj.forEach(function (tag) {
        state.push(tag);
      })
    }
  }
};
