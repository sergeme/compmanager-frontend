export const NewDepartment = class NewDepartment {
  constructor(name, departmentId) {
    this.departmentId = departmentId
    this.name = name;
  }
}

export const Department = class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
