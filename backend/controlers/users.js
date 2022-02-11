const
    { User } = require('../models/user'),
    { respError } = require('../config/helper'),
    { addUserValidate } = require('../validations/users');


exports.checkUserName = async (name) => {
    let user = await User.findOne({ name });

    return (user?._id) ?
        respError("repeated name !") :
        { valid: true };
}


exports.addUser = async (body) => {
    let { error } = addUserValidate(body);
    if (error) return respError(error);

    let user = new User(body);
    user = await user.save();

    const {name, age, rate, qualifications} = user.toJSON();
    return {name, age, rate, qualifications};
}