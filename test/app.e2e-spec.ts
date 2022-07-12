// instalar npm install --save-dev supertest

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {

  let tarefaId: any;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_todo_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar Tarefa', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/tarefas')
      .send({
        nome: 'Primeira tarefa',
        descricao: 'Minha primeira tarefa do dia',
        responsavel: 'Henrique',
        data: '2022-07-15',
        status: true
      });
    expect(201)

    tarefaId = resposta.body.id;

  });

  it('02 - Deve Listar uma Tarefa Específica', async () => {
    return request(app.getHttpServer())
      .get('/tarefas/' + tarefaId)
      .send({})
      .expect(200)

  });

  it('03 - Deve Atualizar uma Tarefa', async () => {
    const resposta = await request(app.getHttpServer())
      .put('/tarefas')
      .send({
        id: tarefaId,
        nome: 'Primeira tarefa - Atualizada!',
        descricao: 'Minha primeira tarefa do dia - Atualizada!',
        responsavel: 'Henrique Felipe',
        data: '2022-08-15',
        status: false
      })
      .expect(200)
  });

  it('04 - Não Deve Atualizar uma Tarefa com Id inválido', async () => {
    const resposta = await request(app.getHttpServer())
      .put('/tarefas')
      .send({
        id: 10000,
        nome: 'Primeira tarefa - Atualizada!',
        descricao: 'Minha primeira tarefa do dia - Atualizada!',
        responsavel: 'Henrique Felipe',
        data: '2022-08-15',
        status: false
      })
      .expect(404)
  });

  it('05 - Deve Apagar uma Tarefa Específica', async () => {
    return request(app.getHttpServer())
      .delete('/tarefas/' + tarefaId)
      .send({})
      .expect(204)
  });

});
