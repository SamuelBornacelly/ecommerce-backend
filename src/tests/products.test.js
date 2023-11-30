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
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /products debe mostrar todos los productos', async() => {
    const res = await request(app)
        .get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products debe crear un producto', async() => {
    const product = {
        title: "Nombre del producto",
        description: "Descripción del producto",
        brand: "Marca del producto",
        price: 1000
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
});

test('PUT /products/:id debe actualizar un producto', async() => {
    const product = {
        title: "Título actualizado"
    }
    const res = await request(app)
        .put(`/products/${id}`)
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
});

test('DELETE /products/:id debe eliminar un producto', async() => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});