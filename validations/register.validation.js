//register.js

const Validator = require("validator");
const isEmpty = require("./is-empty.validation");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // check if the fields are empty or not
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  // check if name has minimum length of 2 char and max of 30
  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.name = "First Name must be between 2 to 30 chars";
  }

  // check if name is not empty
  if (Validator.isEmpty(data.first_name)) {
    errors.name = "First Name is required";
  }

  // check if name has minimum length of 2 char and max of 30
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.name = "Last Name must be between 2 to 30 chars";
  }

  // check if name is not empty
  if (Validator.isEmpty(data.last_name)) {
    errors.name = "Last Name is required";
  }

  //check if email is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // check if email is not empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // check if password length is more than 6 and less than 30
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must have 6 chars";
  }

  if (
    !Validator.isMobilePhone(
      data.phone,
      [
        "ar-AE",
        "ar-BH",
        "ar-DZ",
        "ar-EG",
        "ar-IQ",
        "ar-JO",
        "ar-KW",
        "ar-SA",
        "ar-SY",
        "ar-TN",
        "be-BY",
        "bg-BG",
        "bn-BD",
        "cs-CZ",
        "de-DE",
        "de-AT",
        "da-DK",
        "el-GR",
        "en-AU",
        "en-CA",
        "en-GB",
        "en-GG",
        "en-GH",
        "en-HK",
        "en-MO",
        "en-IE",
        "en-IN",
        "en-KE",
        "en-MT",
        "en-MU",
        "en-NG",
        "en-NZ",
        "en-RW",
        "en-SG",
        "en-UG",
        "en-US",
        "en-TZ",
        "en-ZA",
        "en-ZM",
        "en-PK",
        "es-EC",
        "es-ES",
        "es-MX",
        "es-PA",
        "es-PY",
        "es-UY",
        "et-EE",
        "fa-IR",
        "fi-FI",
        "fj-FJ",
        "fr-FR",
        "fr-GF",
        "fr-GP",
        "fr-MQ",
        "fr-RE",
        "he-IL",
        "hu-HU",
        "id-ID",
        "it-IT",
        "ja-JP",
        "kk-KZ",
        "ko-KR",
        "lt-LT",
        "ms-MY",
        "nb-NO",
        "ne-NP",
        "nl-BE",
        "nl-NL",
        "nn-NO",
        "pl-PL",
        "pt-PT",
        "pt-BR",
        "ro-RO",
        "ru-RU",
        "sl-SI",
        "sk-SK",
        "sr-RS",
        "sv-SE",
        "th-TH",
        "tr-TR",
        "uk-UA",
        "vi-VN",
        "zh-CN",
        "zh-HK",
        "zh-MO",
        "zh-TW",
      ],
      { strictMode: true }
    )
  ){
    errors.phone = "Phone must be a valid mobile number";
  }
    if (Validator.isEmpty(data.phone)) {
      errors.phone = "Phone is required";
    }

  //check if password is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //check if password-confirm length is more than 6 and less than 30
  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = "Password must have 6 chars";
  }

  //check if password-confirm is not empty
  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Password and Confirm Password must match";
  }

  // check if password and password-confirm match with each other.
  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};