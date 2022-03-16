import express from 'express';
import { Controller } from '../common';
import { AppController, AuthController } from '../controllers';

export function initRouter(app: express.Application) {
    const controllers: Controller[] = [new AppController(), new AuthController()];
    app.use(
        '/api',
        controllers.map((controller) => controller.router)
    );
}
