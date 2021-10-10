import api from "./api";

const processEndpoint = 'processes/';

class ProcessService {
  getProcesses() {
    return api
      .get(processEndpoint)
      .then(response => {
        return response.data;
      });
  }

  //processes
  addProcess(process) {
    return api
      .post(processEndpoint, process)
      .then(response => {
        return response.data;
      });
  }

  removeProcess(process) {
    return api
      .delete(processEndpoint + process)
      .then(response => {
        return response.data;
      });
  }

  updateProcess(process) {
    return api
      .put(processEndpoint, process)
      .then(response => {
        return response.data;
      });
  }
}

export default new ProcessService();
