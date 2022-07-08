import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_temas"})
export class Tema {

    @IsInt()
    @PrimaryGeneratedColumn() 
    @ApiProperty()    
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty() 
    descricao: string

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @ApiProperty() 
    postagem: Postagem[]
    
}

