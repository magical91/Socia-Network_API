const { Schema, model } = require('mongoose');
//const moment = require('moment');
const opt = { toJSON: { virtuals: true, getters: true, id: false } };

//const Thought = require('../models/thought');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        ]
    },
    thoughts:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends:
        [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
},
    opt
);

const User = model('User', UserSchema);
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;