import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { TarefaModule } from './tarefa/tarefa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', 
      password: 'root',
      database: 'db_todo',
      entities: [Tarefa, Categoria],
      synchronize: true,
    }),
    CategoriaModule,
    TarefaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
