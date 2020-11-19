import { Keystone } from '@keystonejs/keystone';
import { PasswordAuthStrategy } from '@keystonejs/auth-password';
import { GraphQLApp } from '@keystonejs/app-graphql';
import { AdminUIApp } from '@keystonejs/app-admin-ui';
import { MongooseAdapter } from '@keystonejs/adapter-mongoose';
import * as express from 'express';

export class App {
    public static keystone;
    public static app;

    public static async initialize() {
        const keystone = new Keystone({
            name: 'Todo app',
            adapter: new MongooseAdapter({ mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todosdb' }),
            cookieSecret: 'supersecret'
        });

        this.app = express();
        this.keystone = keystone;
    }

    public static async start() {
        const authStrategy = this.keystone.createAuthStrategy({
            type: PasswordAuthStrategy,
            list: 'User'
        });
        
        const adminUiApp = new AdminUIApp({
            authStrategy: process.env.DISABLE_AUTH === 'true' ? undefined : authStrategy,
            apiPath: '/api'
        });

        const graphQlApp = new GraphQLApp({
            authStrategy: [authStrategy],
            apiPath: '/api',
            graphiqlPath: '/playground',
        });

        const { middlewares } = await this.keystone
            .prepare({ apps: [graphQlApp, adminUiApp], dev: process.env.NODE_ENV !== 'production' })

        await this.keystone.connect();

        this.app.use(middlewares);

        const port = process.env.PORT || 4100;
        this.app.listen(port);
        console.log(`🚀 Server is running on port ${port}`);
        console.log(`🤖 API available on http://127.0.0.1:${port}/api`);
        console.log(`⛱️  GraphQL sandbox http://127.0.0.1:${port}/playground`);
        console.log(`📈 Admin client http://127.0.0.1:${port}/admin`);
    }
}