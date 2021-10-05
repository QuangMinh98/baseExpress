import { Router } from 'express';

export abstract class BaseController {
    protected baseUrl: string;
    protected _router: Router;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this._router = Router();
        this.initRouter();
    }

    get router(): Router {
        return this._router;
    }

    initRouter() {}
}
