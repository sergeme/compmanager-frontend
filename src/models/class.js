export const NewClass = class NewClass {
  constructor(name, startDate, endDate, courseId, curriculumId, locationId) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.courseId = courseId;
    this.curriculumId = curriculumId;
    this.locationId = locationId;
  }
}

export const UpdateClass = class UpdateClass {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export const ChangeClassStudent = class ChangeClassStudent {
  constructor(id, studentId) {
    this.id = id;
    this.studentId = studentId;
  }
}

export const ClassesByLocationAndCourse = class ClassesByLocationAndCourse {
  constructor(locationId, courseId) {
    this.locationId = locationId;
    this.courseId = courseId;
  }
}