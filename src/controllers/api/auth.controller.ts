import { Response, Request, Router } from 'express';
import { Controller } from '../../common';
import { AuthService } from '../../services/auth.service';

export class AuthController implements Controller {
    private readonly baseUrl: string = '/login';
    private _router: Router;
    private readonly authService = AuthService.getInstance();

    constructor() {
        this._router = Router();
        this.initRouter();
    }

    get router() {
        return this._router;
    }

    initRouter() {
        this._router.post(this.baseUrl, this.login);
    }

    async login(req:Request, res:Response) {
        const { email, password } = req.body;
        return await AuthService.login(email, password, res);
    }
}
