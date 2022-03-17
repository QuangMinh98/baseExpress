import { Response, Request, NextFunction } from 'express';
import { HttpException } from '../common';
import { config } from '../config/config';
import { User } from '../models/user.models';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) throw new HttpException(401, { error_code: '401', error_message: 'unauthorized' });

    try {
        const payload = jwt.verify(token, config.get('jwtKey')) as any;
        req.user = payload;
        req.body.user_created = req.body.user_updated = payload._id;
        req.body.created_time = req.body.updated_time = Date.now();

        const user = await User.findById(payload._id);
        if (!user) throw new HttpException(401, { error_code: '401', error_message: 'Invalid token' });

        next();
    } catch (ex) {
        console.log(ex.message);
        throw new HttpException(401, { error_code: '401', error_message: 'token expired' });
    }
}
