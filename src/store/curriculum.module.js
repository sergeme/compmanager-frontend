import CurriculumService from 'services/curriculum.service';

var curricula = []
var processTypes = []

export const curriculum = {
  namespaced: true,
  state: {curricula, processTypes},
  actions: {
    getCurricula({ commit }) {
      return CurriculumService.getCurricula().then(
        curricula => {
          commit('getCurriculaSuccess', curricula);
          return Promise.resolve(curricula);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    addCurriculum({ commit }, newCurriculum) {
      return CurriculumService.addCurriculum(newCurriculum).then(
        curriculum => {
          commit('addCurriculumSuccess', curriculum);
          return Promise.resolve(curriculum);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateCurriculum({ commit }, editCurriculum) {
      return CurriculumService.updateCurriculum(editCurriculum).then(
        curriculum => {
          commit('updateCurriculumSuccess', curriculum);
          return Promise.resolve(curriculum);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteCurriculum({ commit }, deleteCurriculum) {
      return CurriculumService.deleteCurriculum(deleteCurriculum).then(
        response => {
          commit('deleteCurriculumSuccess', deleteCurriculum);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    getProcessTypes({ commit }) {
      return CurriculumService.getProcessTypes().then(
        processTypes => {
          commit('getProcessTypesSuccess', processTypes);
          return Promise.resolve(processTypes);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    createProcessType({ commit }, obj) {
      return CurriculumService.createProcessType(obj).then(
        processType => {
          commit('createProcessTypeSuccess', {
            curriculumId: obj.curriculumId,
            processType: processType
          });
          return Promise.resolve(processType);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    updateProcessType({ commit }, obj) {
      return CurriculumService.updateProcessType(obj.editProcessType).then(
        processType => {
          commit('updateProcessTypeSuccess', {
            curriculumId: obj.curriculumId,
            processType: processType            
          });
          return Promise.resolve(processType);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    deleteProcessType({ commit }, obj) {
      return CurriculumService.deleteProcessType(obj.processTypeId).then(
        response => {
          commit('deleteProcessTypeSuccess',obj);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    addProcessType({ commit }, obj) {
      return CurriculumService.addProcessType(obj).then(
        curriculum => {
          commit('updateCurriculumSuccess', curriculum);
          return Promise.resolve(curriculum);
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    removeProcessType({ commit }, obj) {
      return CurriculumService.removeProcessType(obj).then(
        curriculum => {
          commit('updateCurriculumSuccess', curriculum);
          return Promise.resolve(curriculum);
        },
        error => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    getCurriculaSuccess(state, curricula) {
      state.curricula = curricula;
    },
    addCurriculumSuccess(state, curriculum) {
      state.curricula.push(curriculum);
    },
    updateCurriculumSuccess(state, curriculum) {
      const index = state.curricula.findIndex(c => c.id == curriculum.id)
      state.curricula.splice(index, 1, curriculum)

    },
    deleteCurriculumSuccess(state, id) {
      var index = state.curricula.map(item => item.id).indexOf(id);
      state.curricula.splice(index, 1);
    },
    getProcessTypesSuccess(state, processTypes) {
      state.processTypes = processTypes;
    },
    createProcessTypeSuccess(state, obj) {
      var index = state.curricula.map(item => item.id).indexOf(obj.curriculumId);
      state.curricula[index].processTypes.push(obj.processType);
      state.processTypes.push(obj.processType);
    },
    updateProcessTypeSuccess(state, obj) {
      var processType = state.processTypes.map(item => item.id).indexOf(obj.processType.id)
      state.processTypes.splice(processType, 1, obj.processType)
      state.curricula.forEach(function (curriculum, index, arr) {
        var curriculumProcessType = curriculum.processTypes.map(item => item.id).indexOf(obj.processType.id);
        if (curriculumProcessType !== -1) {
        arr[index].processTypes.splice(curriculumProcessType, 1, obj.processType);
      }
      })
    },
    deleteProcessTypeSuccess(state, obj) {
      var curriculum = state.curricula.map(item => item.id).indexOf(obj.curriculumId);
      var curriculumProcessType = state.curricula[curriculum]
        .processTypes.map(item => item.id).indexOf(obj.processTypeId);
      var processType = state.processTypes.map(item => item.id).indexOf(obj.processTypeId);
      if (curriculumProcessType !== -1) {
        state.curricula[curriculum].processTypes.splice(curriculumProcessType, 1);
      }
      state.processTypes.splice(processType, 1)

    }
  }
};
