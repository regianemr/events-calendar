export function capitalize(word) {
    if (typeof word !== "string" || word.length === 0) {
      return word
    }
    return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()
}
