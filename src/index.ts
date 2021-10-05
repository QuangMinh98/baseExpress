import { App } from './app';
import { config } from './config/config';

function Main() {
    const app = new App();
    const port: number = config.get('port') || 3000;
    app.listen(port, () => {
        console.log('listening on port', port);
    });
}

Main();
