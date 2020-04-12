const Validator = require('validator');
const validText = require('./valid-text');

//validation for user login and registration
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isEmptyl(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmptyl(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
