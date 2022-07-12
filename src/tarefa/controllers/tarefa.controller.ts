import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../services/tarefa.service";

@ApiTags('Tarefa')
@Controller("/tarefas")
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tarefa[]> {
    return this.tarefaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa> {
    return this.tarefaService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('nome') nome: string): Promise<Tarefa[]> {
    return this.tarefaService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.tarefaService.create(tarefa);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.tarefaService.update(tarefa);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    const resultadoDelete = this.tarefaService.delete(id);
    return resultadoDelete;
  }
}