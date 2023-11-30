const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {
    const user = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post('/users/login').send(user)
    token = res.body.token;
});

test('GET /cart debe traer todos los productos del carrito', async() => {
    const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/cart debe agregar productos al carrito', async() => {
    const body = {
        quantity: 2
    }
    const res = await request(app)
    .post('/cart')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(body.quantity);
});

test('PUT /cart/:id debe actualizar el carrito', async() => {
    const body = {
        quantity: 5
    }
    const res = await request(app)
        .put(`/cart/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE /cart/:id debe eliminar el carrito', async() => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});