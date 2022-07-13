import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";

@Injectable()
export class TarefaService {

    constructor(
        @InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ) { }

    async findAll(): Promise<Tarefa[]> {
        return await this.tarefaRepository.find(
            {
                relations: {
                    categoria: true
                }
            });
    }

    async findById(id: number): Promise<Tarefa> {
        let tarefa = await this.tarefaRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        });

        if (!tarefa)
            throw new HttpException('Tarefa não existe', HttpStatus.NOT_FOUND);

        return tarefa;
    }

    async findByNome(nome: string): Promise<Tarefa[]> {
        return await this.tarefaRepository.find({
            where: {
                nome: ILike(`%${nome}%`),
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(tarefa: Tarefa): Promise<Tarefa> {
        return await this.tarefaRepository.save(tarefa);
    }

    async update(tarefa: Tarefa): Promise<Tarefa> {
        let tarefaUpdate = await this.findById(tarefa.id);

        if (!tarefaUpdate || !tarefa.id)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);

        return await this.tarefaRepository.save(tarefa);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaTarefa = await this.findById(id);

        if (!buscaTarefa)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);

        return await this.tarefaRepository.delete(id);
    }
}