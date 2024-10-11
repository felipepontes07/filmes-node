
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/filmes', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createfilmes(body);
    return reply.status(201).send();
})

// READE
server.get('/filmes', async () => {
    const filmes = await databasePostgres.listfilmes();
    return filmes;
});

// UPDATE
server.put('/filmes/:id', async (request, reply) => {
    const filmesID = request.params.id;
    const body = request.body;
    await databasePostgres.updatefilmes(filmesID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/filmes/:id', async (request, reply) => {
    const filmesID = request.params.id;
    await databasePostgres.deletefilmes(filmesID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});
