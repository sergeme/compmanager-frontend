import api from "./api";

const curriculumEndpoint = 'curricula/';
const processTypeEndpoint = 'processtypes/';

class CurriculumService {
  async getCurricula() {
    const response = await api
      .get(curriculumEndpoint);
    return response.data;
  }

  async addCurriculum(curriculum) {
    const response = await api
      .post(curriculumEndpoint, curriculum);
    return response.data;
  }

  async updateCurriculum(curriculum) {
    const response = await api
      .put(curriculumEndpoint, curriculum);
    return response.data;
  }

  async deleteCurriculum(curriculum) {
    const response = await api
      .delete(curriculumEndpoint + curriculum);
    return response.data;
  }

  //processtypes
  async getProcessTypes() {
    const response = await api
      .get(processTypeEndpoint);
    return response.data;
  }
  async createProcessType(processType) {
    const response = await api
      .post(processTypeEndpoint, processType);
    return response.data;
  }

  async deleteProcessType(processType) {
    const response = await api
      .delete(processTypeEndpoint + processType);
    return response.data;
  }

  async updateProcessType(processType) {
    const response = await api
      .put(processTypeEndpoint, processType);
    return response.data;
  }

  async addProcessType(obj) {
    const response = await api
      .put(curriculumEndpoint + 'add-processtype', obj);
    return response.data;
  }

  async removeProcessType(obj) {
    const response = await api
      .put(curriculumEndpoint + 'remove-processtype', obj);
    return response.data;
  }
}

export default new CurriculumService();
