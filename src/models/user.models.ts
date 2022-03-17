import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { IFUser } from '../interfaces/user.interface';
import Joi from 'Joi';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        maxlength: 500
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    //Them loai dang nhap la gi vi du google hay face
    authType: {
        type: String,
        enum: ['local', 'google', 'facebook'], // cho phep gia tri string trung voi 1 trong phan tu array trong enum
        default: 'local'
    },
    authGoogleId: {
        type: String,
        default: null
    },
    authFacebookId: {
        type: String,
        default: null
    },
    tokenAccess: {
        type: String,
        default: null
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ],
    admin: {
        type: Boolean,
        default: false
    },
    birthdate: {
        type: Number
    },
    gender: {
        type: String
    },
    group_users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    resetLink: {
        type: String
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: ''
    },
    created_time: {
        type: Date,
        default: Date.now()
    },
    updated_time: {
        type: Date,
        default: Date.now()
    },
    user_created: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user_updated: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

UserSchema.methods.generateToken = function () {
    const data = {
        _id: this._id,
        admin: this.admin,
        roles: this.roles
    };

    return jwt.sign(data, config.get('jwtKey'));
};

UserSchema.methods.hashPassword = async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

export function validateUser(user: any) {
    const schema = Joi.object().keys({
        id: Joi.string().allow(null).allow(''),
        name: Joi.string().max(50).min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(255).required(),
        phoneNumber: Joi.number().required(),
        address: Joi.string().max(500).allow(null).allow(''),
        birthdate: Joi.number().allow(null).allow(''),
        gender: Joi.string().allow(null).allow(''),
        admin: Joi.boolean().allow(null).allow(''),
        status: Joi.string().allow(null).allow(''),
        roles: Joi.array().allow(null),
        otp: Joi.string().allow(null).allow('')
    });
    return schema.validate(user);
}

export function validateUpdate(user: any) {
    const schema = Joi.object().keys({
        id: Joi.string().allow(null).allow(''),
        name: Joi.string().allow(null).allow(''),
        email: Joi.string().email().allow(null).allow(''),
        password: Joi.string().min(6).max(200).allow(null).allow(''),
        phoneNumber: Joi.number().allow(null).allow(''),
        address: Joi.string().max(500).allow(null).allow(''),
        birthdate: Joi.number().allow(null).allow(''),
        gender: Joi.string().allow(null).allow(''),
        admin: Joi.boolean().allow(null).allow(''),
        status: Joi.string().allow(null).allow(''),
        roles: Joi.array().allow(null),
        otp: Joi.string().allow(null).allow('')
    });
    return schema.validate(user);
}

export const User = mongoose.model<IFUser>('User', UserSchema);
