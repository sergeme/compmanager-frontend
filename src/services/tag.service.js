import api from "./api";

const competenceEndpoint = 'competences/';

class TagService {
  async getTags() {
    const response = await api
      .get(competenceEndpoint + "get-tags");
    return response.data;
  }
}

export default new TagService();
