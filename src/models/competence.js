export const Process = class Process {
  constructor(id, name, content) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
}

export const StudentClass = class StudentClass {
  constructor(name, orderedProcesses) {
    this.name = name;
    this.orderedProcesses = orderedProcesses;
  }
}

export const OrderedProcessList = class OrderedProcessList {
  constructor(type, processes) {
    this.type = type;
    this.processes = processes;
  }
}

export const NewCompetenceLight = class NewCompetenceLight {
  constructor(accountId, processId, context, action) {
    this.accountId = accountId;
    this.processId = processId;
    this.context = context;
    this.action = action;
  }
}

export const EditCompetenceLight = class EditCompetenceLight {
  constructor(id, accountId, processId, context, action) {
    this.id = id;
    this.accountId = accountId;
    this.processId = processId;
    this.context = context;
    this.action = action;
  }
}

export const RemoveCompetence = class RemoveCompetence {
  constructor(competenceId, accountId) {
    this.competenceId = competenceId;
    this.accountId = accountId;

  }
}

export const NewCompetence = class NewCompetence {
  constructor(accountId, processId, context, action) {
    this.accountId = accountId;
    this.processId = processId;
    this.context = context;
    this.action = action;
  }
}

export const CompetenceProfileRequest = class CompetenceProfileRequest {
  constructor(competences) {
    this.competences = competences;
  }
}
