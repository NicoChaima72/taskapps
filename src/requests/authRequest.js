const validate = require("./request");

const request = {};

request.register = (req, res, next) => {
  const validationRule = {
    name: "required",
    email: "required",
    password: "required|min:8|confirmed",
    password_confirmation: "required",
  };

  const customMessages = {
    "confirmed.password": "Las contraseñas no coinciden",
  };

  return validate(req.body, validationRule, customMessages, req, res, next);
};

request.login = (req, res, next) => {
  const validationRule = {
    email: "required",
    password: "required",
  };

  const customMessages = {};

  return validate(req.body, validationRule, customMessages, req, res, next);
};

request.linkRequest = (req, res, next) => {
  const validationRule = {
    email: "required",
  };

  return validate(req.body, validationRule, {}, req, res, next);
};

request.resetPassword = (req, res, next) => {
  const validationRule = {
    password: "required|min:8|confirmed",
    password_confirmation: "required",
  };

  const customMessages = {};

  return validate(req.body, validationRule, customMessages, req, res, next);
};

module.exports = request;
