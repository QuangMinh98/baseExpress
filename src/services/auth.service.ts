import { User } from '../models/user.models';
import { Request, Response } from 'express';
import { HttpException } from '../common';
import bcrypt from 'bcrypt';
import { pick } from 'lodash';

class AuthService {
    private static instance: AuthService;

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    static async login(email: string, password: string, res: Response) {
        const user = await User.findOne({ email });
        if (!user) throw new HttpException(400, { error_code: '400', error_message: 'Invalid email or password' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new HttpException(400, { error_code: 1, error_message: 'Invalid email or password' });

        const response = {
            user: pick(user, ['_id', 'name', 'email'])
        };

        const token = user.generateToken();
        res.header('x-auth-token', token).send(response);
    }
}

export { AuthService };
