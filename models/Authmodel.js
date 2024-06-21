const mongoose = require('mongoose');
//create schema

const AuthSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // mails: {
    //     inbox: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'emails'
    //     }],
    //     sent: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'emails'
    //     }],
    //     drafts: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'emails'
    //     }],
    //     trash: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'emails'
    //     }],
    //     starred: [{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'emails'
    //     }],
    // },
    roles: {
        type: Array,
        default: ["customer"],
    },
});

module.exports = mongoose.model('users', AuthSchema);