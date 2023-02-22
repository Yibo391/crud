const validator = {}

/**
 * It checks whether the input string is an email.
 *
 * @param {string} email the email.
 * @returns {boolean} whether the string has an email properties.
 */
validator.isEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/
  return emailRegex.test(email)
}

/**
 * It checks whether the input string is a proper password.
 *
 * @param {string} password the given password.
 * @returns {boolean} whether the string has 8 charchters inc. one in upper case, one in lower case and a digit.
 */
validator.isPassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasDigit = /\d/.test(password)

  return hasUpperCase && hasLowerCase && hasDigit
}

/**
 * It checks whether the provided input has the characteristics of a name.
 *
 * @param {string} someName the input.
 * @param name
 * @returns {boolean} whether it is a name.
 */
validator.isName = (name) => {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
  return nameRegex.test(name)
}

module.exports = validator
