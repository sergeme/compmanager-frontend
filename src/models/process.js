export const NewProcess = class NewProcess {
  constructor(curriculumId, processTypeId, name, content) {
    this.curriculumId = curriculumId;
    this.processTypeId = processTypeId;
    this.name = name;
    this.content = content;
  }
}

export const Process = class Process {
  constructor(id, name, content) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
}
