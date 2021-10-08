export const NewCourse = class NewCourse {
  constructor(departmentId, name) {
    this.departmentId = departmentId;
    this.name = name;
  }
}

export const Course = class Course {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
