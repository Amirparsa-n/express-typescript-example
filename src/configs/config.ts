import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const isProduction = process.env.NODE_ENV === 'production';

