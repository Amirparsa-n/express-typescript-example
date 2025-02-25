import supertest from 'supertest';
import '../configs/loadTestEnv';
import { bootstrap, closeServer } from '../index';

let server: any;

beforeAll(async () => {
    await closeServer(); // Ensure any existing server is closed
    server = await bootstrap();
    const request = supertest(server);

    // await request.post(`/api/auth/register`).send({
    //     username: 'amir2',
    //     name: 'amir2',
    //     email: 'amir@gmail.com',
    //     phone: '09130531884',
    //     password: 'amir2',
    // });

    const response = await request.post(`/api/auth/login`).send({ username: 'amir', password: 'amir' });
    console.log(response.body);
});

test('article', () => {
    console.log('yo yo');
});

describe('Server.ts tests', () => {
    test('Math test', () => {
        expect(2 + 2).toBe(4);
    });
});

afterAll(async () => {
    await closeServer(); // Ensure the server is closed after tests
});
