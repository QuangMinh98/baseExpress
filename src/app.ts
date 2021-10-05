import express from 'express';
import { config } from './config/config';
import { ControllerFactory } from './controllers';
import { errorMiddleware, Controller } from './common';

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.initRouter([ControllerFactory.get('App')]);
    }

    private async connectDatabase() {}

    private initRouter(controllers?: Controller[]): void {
        if (controllers && controllers.length > 0) {
            this.app.use(
                '/api',
                controllers.map((controller) => controller.router)
            );
        }
        this.initializeErrorHandling();
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    async listen(port: number, callback?: () => void): Promise<void> {
        await this.app.listen(port, callback);
    }
}
