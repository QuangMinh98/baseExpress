import { User } from '../models/user.models';
import { validateUser, validateUpdate } from '../models/user.models';
import { pick } from 'lodash';
import { HttpException } from '../common';

export class UserService {
    private static instance: UserService;

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}
