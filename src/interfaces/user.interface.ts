import { Document } from 'mongoose';

export interface IFUser extends Document{
    name: string;
    email: string;
    password: string;

    generateToken(): string;
}
