const validate = require("./request");

const request = {};

request.store = (req, res, next) => {
  const validationRule = {
    description: "required|max:50",
  };

  return validate(req.body, validationRule, {}, req, res, next);
};

request.update = (req, res, next) => {
  const validationRule = {
    description: "required|max:50",
  };

  return validate(req.body, validationRule, {}, req, res, next);
};

module.exports = request;
