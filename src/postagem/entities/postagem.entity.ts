import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"
import { Tema } from "src/tema/entities/tema.entity"
import { Usuario } from "src/usuario/entities/usuario.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: "tb_postagens"})
export class Postagem {

    @IsInt()
    @PrimaryGeneratedColumn()  
    @ApiProperty()   
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty() 
    titulo: string

    @Column({length: 1000, nullable: false})
    @ApiProperty() 
    texto: string

    @UpdateDateColumn()
    @ApiProperty() 
    data: Date
    
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    @ApiProperty() 
    tema: Tema
    
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Usuario }) 
    usuario: Usuario

}


