import CompetenceService from 'services/competence.service';

export const competences = {
  namespaced: true,
  state: [],
  actions: {
    getCompetences({ commit }) {
      return CompetenceService.getCompetences().then(
        competences => {
          commit('getCompetencesSuccess', competences);
          return Promise.resolve(competences);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    addCompetence({ commit }, newCompetence) {
      return CompetenceService.addCompetence(newCompetence).then(
        competence => {
          commit('addCompetenceSuccess', competence);
          return Promise.resolve(competence);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateCompetence({ commit }, editCompetence) {
      return CompetenceService.updateCompetence(editCompetence).then(
        competence => {
          commit('updateCompetenceSuccess', competence);
          return Promise.resolve(competence);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteCompetence({ commit }, deleteCompetence) {
      return CompetenceService.deleteCompetence(deleteCompetence).then(
        () => {
          commit('deleteCompetenceSuccess', deleteCompetence);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    addTag({ commit }, tag) {
      return CompetenceService.addTag(tag).then(
        competence => {
          commit('addTagSuccess', competence);
          return Promise.resolve(tag);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    removeTag({ commit }, tag) {
      return CompetenceService.removeTag(tag).then(
        competence => {
          commit('removeTagSuccess', competence);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    getCompetencesSuccess(state, competences) {
      state.splice(0, state.length);
      competences.forEach(function (competence) {
        state.push(competence);
      })
    },
    addCompetenceSuccess(state, competence) {
      state.push(competence);
    },
    updateCompetenceSuccess(state, competence) {
      var index = state.map(item => item.id).indexOf(competence.id);
      state.splice(index, 1, competence);
    },
    deleteCompetenceSuccess(state, competence) {
      var index = state.map(item => item.id).indexOf(competence.competenceId);
      state.splice(index, 1);
    },
    addTagSuccess(state, competence) {
      var index = state.map(item => item.id).indexOf(competence.id);
      state.splice(index, 1, competence)
    },
    removeTagSuccess(state, competence) {
      var index = state.map(item => item.id).indexOf(competence.id);
      state.splice(index, 1, competence)
    }
  }
};
