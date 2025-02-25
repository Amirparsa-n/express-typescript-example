import { createApp } from './app';
import dotenv from 'dotenv';
dotenv.config();

let server: any;

export async function bootstrap() {
    const PORT = process.env.PORT;
    const app = createApp();

    try {
        server = app.listen(PORT, () => {
            console.info(`
                #########################################################
                  Server listening on : http://localhost:${PORT} 
                #########################################################
              `);
        });
        return server;
    } catch (err) {
        console.error(err);
    }
}

export async function closeServer() {
    if (server) {
        await server.close();
    }
}

bootstrap();
