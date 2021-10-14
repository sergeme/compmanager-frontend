export const NewCurriculum = class NewCurriculum {
  constructor(name) {
    this.name = name;
  }
}

export const Curriculum = class Curriculum {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export const ChangeCurriculumProcessType = class ChangeCurriculumProcessType {
  constructor(curriculumId, processTypeId) {
    this.curriculumId = curriculumId;
    this.processTypeId = processTypeId;
  }
}
