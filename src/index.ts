if (process.cwd().split('/').pop() !== 'dist') {
    process.chdir('dist');
}

import { App } from './controllers/App';
import { apiRouter } from './routes';
import * as fs from 'fs';

App.initialize().then(async () => {
    const models = fs.readdirSync('./models');
    for (const model of models.filter(m => m.endsWith('.js'))) {
        await import(`./models/${model}`);
    }
    
    App.app.use(apiRouter);
    App.start();
});

process.on('SIGINT', () => {
    console.log('Caught interrupt signal');
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Caught interrupt signal');
    process.exit();
});