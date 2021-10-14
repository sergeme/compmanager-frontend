import ProcessService from 'services/process.service';

var processes = []

export const process = {
  namespaced: true,
  state: processes,
  actions: {
    getProcesses({ commit }) {
      return ProcessService.getProcesses().then(
        processes => {
          commit('getProcessesSuccess', processes);
          return Promise.resolve(processes);
        },
        error => {
          return Promise.resolve(error);
        }
      )
    },
    addProcess({ commit }, newProcess) {
      return ProcessService.addProcess(newProcess).then(
        process => {
          commit('addProcessSuccess', process);
          return Promise.resolve(process);
        },
        error => {
          return Promise.resolve(error);
        }
      )
    },
    updateProcess({ commit }, editProcess) {
      return ProcessService.updateProcess(editProcess).then(
        process => {
          commit('updateProcessSuccess', process);
          return Promise.resolve(process);
        },
        error => {
          return Promise.resolve(error);
        }
      )
    },
    deleteProcess({ commit }, deleteProcess) {
      return ProcessService.deleteProcess(deleteProcess).then(
        () => {
          commit('deleteProcessSuccess', deleteProcess);
          return Promise.resolve();
        },
        error => {
          return Promise.resolve(error);
        }
      )
    }
  },
  mutations: {
    getProcessesSuccess(state, processes) {
      state.processes = processes;
    },
    addProcessSuccess(state, process) {
      state.processes.push(process);
    },
    updateProcessSuccess(state, process) {
      var index = state.processes.map(item => item.id).indexOf(process.id);
      state.processes.splice(index, 1, process);
    },
    deleteProcessSuccess(state, id) {
      var index = state.processes.map(item => item.id).indexOf(id);
      state.processes.splice(index, 1);
    }
  }
};
