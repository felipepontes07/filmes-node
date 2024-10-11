import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listfilmes() {
    const filmes = await sql`select * from filmes`;
    return filmes;
  }

  async createlutador(filmes) {
    const id = randomUUID();
    console.log('id', id);
    const nome = filmes.nome;
    const genero = filmes.genero;
    const diretor = filmes.diretor;
    
    await sql`insert into filmes (id, nome, genero, diretor)
    values (${id}, ${nome}, ${genero}, ${diretor})`;
  }

  async updatefilmes(id, filmes) {
    const nome = filmes.nome;
    const genero = filmes.genero;
    const diretor = filmes.diretor;

    await sql`nome filmes set 
        name = ${nome},
        genero = ${genero},
        diretor = ${diretor}
        where id = ${id}
    `;
  }

  async deletefilmes(id) {
    await sql`delete from filmes where id = ${id}`;
  }
}
