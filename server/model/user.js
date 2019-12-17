const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);
const Joi = require('@hapi/joi');

// with Joi validation
const joiUserSchema = Joi.object({
    id: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    isDeleted: Joi.boolean().required()
});

const mongooseUserSchema = new mongoose.Schema(Joigoose.convert(joiUserSchema));

// eslint-disable-next-line new-cap
const user = new mongoose.model('User', mongooseUserSchema);

module.exports = user;

// // all fields are required
// const schema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     login: {
//         type: String,
//         required: true,
//         // login validation is required, unique meets the requirement?
//         unique: true
//     },
//     password: {
//         type: String,
//         validate: {
//             validator(v) {
//                 // password must contain letters and numbers
//                 return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(v);
//             },
//             message: props => `${props.value} is not a valid password!`
//         },
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         // user’s age must be between 4 and 130
//         min: 4,
//         max: 130
//     },
//     isDeleted: {
//         type: Boolean,
//         required: true,
//         default: false
//     }
// });

// const user = new mongoose.model('User', schema);

// module.exports = user;
