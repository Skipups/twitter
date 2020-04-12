const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(text.data, { min: 5, max: 140 })) {
    errors.text = 'Tweet must be between 5 and 140 characters';
  }
  if (Validator.isEmpty(text.data)) {
    errors.text = "Text field can't be empty";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
