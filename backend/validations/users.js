const Joi = require('joi');


exports.addUserValidate = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        age: Joi.number().optional(),
        rate: Joi.number().min(2).max(5).optional(),
        qualifications: Joi.string().optional(),
    });

    return schema.validate(body);
}
