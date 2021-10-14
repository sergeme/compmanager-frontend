import api from "./api";

const processEndpoint = 'processes/';

class ProcessService {
  async getProcesses() {
    const response = await api
      .get(processEndpoint);
    return response.data;
  }

  //processes
  async addProcess(process) {
    const response = await api
      .post(processEndpoint, process);
    return response.data;
  }

  async deleteProcess(process) {
    const response = await api
      .delete(processEndpoint + process);
    return response.data;
  }

  async updateProcess(process) {
    const response = await api
      .put(processEndpoint, process);
    return response.data;
  }
}

export default new ProcessService();
