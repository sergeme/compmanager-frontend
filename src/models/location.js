export const NewLocation = class NewLocation {
  constructor(courseId, name) {
    this.courseId = courseId;
    this.name = name;
  }
}

export const Location = class Location {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export const DeleteLocation = class DeleteLocation {
  constructor(id, departmentId, courseId) {
    this.id = id;
    this.departmentId = departmentId;
    this.courseId = courseId;
  }
}
