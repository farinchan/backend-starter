const request = require('supertest');
const app = require('../src/app');

describe('API Health Check', () => {
    test('GET / should return welcome message', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Welcome to Backend Starter API');
    });

    test('GET /api should return API info', async () => {
        const response = await request(app)
            .get('/api')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Backend API is running');
    });

    test('GET /api/example/health should return health status', async () => {
        const response = await request(app)
            .get('/api/example/health')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe('healthy');
    });
});

describe('404 Handler', () => {
    test('GET /nonexistent should return 404', async () => {
        const response = await request(app)
            .get('/nonexistent')
            .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('not found');
    });
});
