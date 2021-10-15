export const NewProcessType = class NewProcessType {
  constructor(curriculumId, courseId, name) {
    this.curriculumId = curriculumId;
    this.courseId = courseId
    this.name = name;
  }
}

export const ProcessType = class ProcessType {
  constructor(id, courseId, name) {
    this.id = id;
    this.courseId = courseId;
    this.name = name;
  }
}
