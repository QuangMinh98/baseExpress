import { Schema, Document } from 'mongoose';

export interface IFUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    authType: string;
    authGoogleId: string;
    user_updated:Schema.Types.ObjectId;
    authFacebookId: string;
    tokenAccess: string;
    admin: boolean;
    roles: Schema.Types.ObjectId[];
    birthdate: number;
    gender: string;
    resetLink: string;
    isVerify: string;
    otp: string;
    groups: Schema.Types.ObjectId[];
    generateToken(): string;
    hashPassword(): string;
}
