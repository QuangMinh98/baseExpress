import { User } from '../models/user.models';
import { Request, Response } from 'express';
import Joi from 'joi';
import { HttpException } from '../common';
import bcrypt from 'bcrypt';
import { pick } from 'lodash';

export class AuthService {
    private static instance: AuthService;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

     async login(email: string, password: string, res: Response) {
        // Validate login data\
        const { error } = AuthService.validate({ email, password });
        if (error) throw new HttpException(400, { error_code: '01', error_message: error.details[0].message });

        const user = await User.findOne({ email });
        if (!user) throw new HttpException(400, { error_code: '400', error_message: 'Invalid email or password' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new HttpException(400, { error_code: '400', error_message: 'Invalid email or password' });

        const response = {
            user: pick(user, ['_id', 'name', 'email'])
        };

        const token = user.generateToken();
        res.header('x-auth-token', token).send(response);
    }

    /**
     * Function login data with Facebook
     * @param {*} user
     * @return
     */
     async facebookLogin(user: any, res: Response) {
        const loginFacebook = await User.findOne(user._id);
        if (!loginFacebook) throw new HttpException(404, { error_code: '01', error_message: 'User not found' });

        const token = user.generateToken();
        const response = {
            user:pick(user, ['email', 'name', 'authType'])
        }
        res.header('x-auth-token', token).send(response);
    }

    /**
     * Function login data with Google
     * @param {*} user
     * @return
     */
     async googleLogin(user: any, res: Response) {
        const loginGoogle = await User.findOne(user._id);
        if (!loginGoogle) throw new HttpException(404, { error_code: '01', error_message: 'User not found' });

        const token = user.generateToken();
        const response = {
            user:pick(user, ['email', 'name', 'authType'])
        }
        res.header('x-auth-token', token).send(response);
    }

    /**
     * Function to validate login info
     *
     * @param loginData login info
     * @returns
     */
    static validate(loginData: { email: string; password: string }): Joi.ValidationResult {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(50).required()
        });
        return schema.validate(loginData);
    }
}
