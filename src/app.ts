import express from 'express';
import { config } from './config/config';
import { errorMiddleware, Controller } from './common';
import { initRouter } from './routes/api';

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.connectDatabase();
        this.initRouter();
    }

    private async connectDatabase() {}

    private logger() {}

    private initRouter(): void {
        initRouter(this.app);
        this.initializeErrorHandling();
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    async listen(port: number, callback?: () => void): Promise<void> {
        await this.app.listen(port, callback);
    }
}
