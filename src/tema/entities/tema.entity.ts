import { ApiProperty } from "@nestjs/swagger";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"})
export class Tema {

    @PrimaryGeneratedColumn() 
    @ApiProperty()    
    id: number

    @Column({length: 100, nullable: false})
    @ApiProperty() 
    descricao: string

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @ApiProperty() 
    postagem: Postagem[]
    
}

