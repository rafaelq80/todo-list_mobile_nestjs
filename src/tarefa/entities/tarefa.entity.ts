import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MaxLength } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Categoria } from "../../categoria/entities/categoria.entity"

@Entity({name: "tb_tarefas"})
export class Tarefa {

    @PrimaryGeneratedColumn()   
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @MaxLength(30)
    @Column({length: 30, nullable: false})
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @Column({length: 5000, nullable: false})
    @ApiProperty()
    descricao: string

    @IsNotEmpty()
    @Column({length: 5000, nullable: false})
    @ApiProperty()
    responsavel: string
    
    @Column()
    @ApiProperty()
    data: Date

    @Column()
    @ApiProperty()
    status: boolean

    @ManyToOne(() => Categoria, (categoria) => categoria.tarefas, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Categoria })
    categoria: Categoria
}