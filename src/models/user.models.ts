import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { IFUser } from '../interfaces/user.interface';

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

UserSchema.methods.generateToken = function () {
    const data = {
        _id: this._id,
        name: this.name,
        email: this.email
    };

    return jwt.sign(data, config.get('jwtKey'));
};

UserSchema.methods.hashPassword = async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

export const User = mongoose.model<IFUser>('User', UserSchema);
