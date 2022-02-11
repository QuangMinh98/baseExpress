import express from 'express';
import { Controller } from '../common';
import { AppController } from '../controllers';

export function initRouter(app: express.Application) {
    const controllers: Controller[] = [new AppController()];
    app.use(
        '/api',
        controllers.map((controller) => controller.router)
    );
}
