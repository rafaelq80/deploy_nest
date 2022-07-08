import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt, IsNotEmpty } from "class-validator"
import { Postagem } from "src/postagem/entities/postagem.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @IsInt()
    @PrimaryGeneratedColumn() 
    @ApiProperty()   
    public id: number

    @Column({length: 80, nullable: false}) 
    @ApiProperty() 
    public nome: string

    @IsEmail()
    @Column({length: 80, nullable: false })
    @ApiProperty()  
    public usuario: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    public senha: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    public foto: string

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    @ApiProperty() 
    postagem: Postagem[]

}