import express, { Request, Response } from 'express';
require('express-async-errors');
import { isProduction } from './configs/config';
import apiRoutes from './routes';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/error-handler';

let swaggerDocument: any;
if (!isProduction) {
    try {
        swaggerDocument = require('./configs/swagger.json');
    } catch (error) {
        console.error('Swagger document not found, skipping Swagger setup.');
        swaggerDocument = null;
    }
}

export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(compression());
    app.use(helmet());
    app.use(cors({ origin: '*' }));
    app.use(morgan('dev'));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        message: async (req: Request, res: Response) => {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        },
    });
    app.use(limiter);

    if (!isProduction && swaggerDocument) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    // API Routes
    app.use('/api', apiRoutes);

    // 404 response
    app.all('*', (req: Request, res: Response): any => {
        return res.status(404).json({ message: 'Not Found' });
    });

    app.use(errorHandler);

    return app;
}
