import { IsNotEmpty, MaxLength } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"

@Entity({name: "tb_tarefas"})
export class Tarefa {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @MaxLength(30)
    @Column({length: 30, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 5000, nullable: false})
    descricao: string

    @IsNotEmpty()
    @Column({length: 5000, nullable: false})
    responsavel: string
    
    @Column()
    data: Date

    @Column()
    status: boolean

    @ManyToOne(() => Categoria, (categoria) => categoria.tarefas, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}