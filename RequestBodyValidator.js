const Joi = require('joi');

const createProductSchema = Joi.object({
  barcode: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  imageurl: Joi.string().required(),
  ShowHide: Joi.string().required(),
});

const createUserSchema = Joi.object({
  first_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

function validateCreateProductBody(product) {
  const result = createProductSchema.validate(product);
  if (result.error) {
    return false;
  }
  return true;
}
function validateCreateUserBody(user) {
  const result = createUserSchema.validate(user);
  if (result.error) {
    return false;
  }
  return true;
}
module.exports = { validateCreateProductBody, validateCreateUserBody };
