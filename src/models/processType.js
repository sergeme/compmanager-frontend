export const NewProcessType = class NewProcessType {
  constructor(curriculumId, courseId, name) {
    this.curriculumId = curriculumId;
    this.courseId = courseId
    this.name = name;
  }
}

export const ProcessType = class ProcessType {
  constructor(id, name, courseId) {
    this.id = id;
    this.name = name;
    this.courseId = courseId;
  }
}
