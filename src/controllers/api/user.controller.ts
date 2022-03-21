import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { UserService } from '../../services/user.service';

export class UserController implements Controller {
    private readonly baseUrl: string = '/users';
    private _router: Router;
    private readonly userService = UserService.getInstance();

    constructor() {
        this._router = Router();
        this.initRouter();
    }

    get router() {
        return this._router;
    }

    initRouter() {}
}
