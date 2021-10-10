import api from "./api";

const curriculumEndpoint = 'curricula/';
const processTypeEndpoint = 'processtypes/';

class CurriculumService {
  getCurricula() {
    return api
      .get(curriculumEndpoint)
      .then(response => {
        return response.data;
      });
  }

  addCurriculum(curriculum) {
    return api
      .post(curriculumEndpoint, curriculum)
      .then(response => {
        return response.data;
      });
  }

  updateCurriculum(curriculum) {
    return api
      .put(curriculumEndpoint, curriculum)
      .then(response => {
        return response.data;
      });
  }

  deleteCurriculum(curriculum) {
    return api
      .delete(curriculumEndpoint + curriculum)
      .then(response => {
        return response.data;
      });
  }

  //processtypes
  createProcessType(processType) {
    return api
      .post(processTypeEndpoint, processType)
      .then(response => {
        return response.data;
      });
  }

  deleteProcessType(processType) {
    return api
      .post(processTypeEndpoint, processType)
      .then(response => {
        return response.data;
      });
  }

  updateProcessType(processType) {
    return api
      .put(processTypeEndpoint, processType)
      .then(response => {
        return response.data;
      });
  }

  addProcessType(obj) {
    return api
      .put(curriculumEndpoint+'add-processtype', obj)
      .then(response => {
        return response.data;
      });
  }

  removeProcessType(obj) {
    return api
      .put(curriculumEndpoint+'remove-processtype', obj)
      .then(response => {
        return response.data;
      });
  }
}

export default new CurriculumService();
