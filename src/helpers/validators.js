const domain = {
  getMessage(field) {
    return field + " muss eine @teko.ch oder @edu.teko.ch Adresse sein"
  },
  validate(value) {
    return (value.includes("@edu.teko.ch") || value.includes("@teko.ch") || value.includes("@gmail.com"))
  }
};

export { domain };