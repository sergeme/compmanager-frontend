export const NewTag = class NewTag {
  constructor(accountId, competenceId, name) {
    this.accountId = accountId;
    this.competenceId = competenceId;
    this.name = name;
  }
}

export const RemoveTag = class RemoveTag {
  constructor(accountId, competenceId, tagId) {
    this.accountId = accountId;
    this.competenceId = competenceId;
    this.tagId = tagId;
  }
}
