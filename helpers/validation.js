const Joi = require("joi");

//Register Validation
const registerValidation = (reqBody) => {
    const Schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return Schema.validate(reqBody)
};

//login Validation
const loginValidation = (reqBody) => {
    const Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return Schema.validate({email : reqBody.email, password: reqBody.password})
};

const TodosValidation = (reqBody) => {
    const Schema = Joi.object({
        title: Joi.string().min(2).required(),
        description: Joi.string().min(6).required(),
        deadline: Joi.date().required()
    })
    return Schema.validate(reqBody)
};

module.exports = {
    registerValidation,
    loginValidation,
    TodosValidation
}