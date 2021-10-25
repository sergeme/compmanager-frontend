import api from "./api";

const competenceEndpoint = 'competences/';

class CompetenceService {
  async getCompetences() {
    const response = await api
      .get(competenceEndpoint);
    return response.data;
  }

  async getCompetenceProfile(obj) {
    const response = await api
      .post(competenceEndpoint + "get-competenceprofile", obj)
    return response.data;
  }

  //competencees
  async addCompetence(competence) {
    const response = await api
      .post(competenceEndpoint, competence);
    return response.data;
  }

  async deleteCompetence(competence) {
    const response = await api
      .delete(competenceEndpoint, {
        data: {
          accountId: competence.accountId,
          competenceId: competence.competenceId
      } });
    return response.data;
  }

  async updateCompetence(competence) {
    const response = await api
      .put(competenceEndpoint, competence);
    return response.data;
  }

  async addTag(tag) {
    const response = await api
      .put(competenceEndpoint + "add-tag", tag);
    return response.data;
  }

  async removeTag(tag) {
    const response = await api
      .put(competenceEndpoint + "remove-tag", tag);
    return response.data;
  }
}

export default new CompetenceService();
