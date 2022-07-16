import { Usuario } from './../../usuario/entities/usuario.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService,
        private usuarioService: UsuarioService
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find(
            {
                relations:{
                    tema: true
                }
            }
        );
    }

    async findOneById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
            
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {

        if (postagem.tema || postagem.usuario){
            
            if(!postagem.tema){

                let usuario = await this.usuarioService.findOneById(postagem.usuario.id)
                
                if (!usuario)
                    throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
                
                return await this.postagemRepository.save(postagem);
            
            }else if(!postagem.usuario){

                let tema = await this.temaService.findOneById(postagem.tema.id)        
            
                if (!tema)
                throw new HttpException('Tema não encontrados!', HttpStatus.NOT_FOUND);

                return await this.postagemRepository.save(postagem);
                
            }else{

                let tema = await this.temaService.findOneById(postagem.tema.id) 
                let usuario = await this.usuarioService.findOneById(postagem.usuario.id)

                if (!tema || !usuario )
                    throw new HttpException('Tema e/ou Usuário não encontrados!', HttpStatus.NOT_FOUND);
            
            }

        }

        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        
        let post: Postagem = await this.findOneById(postagem.id);

        if (post === undefined)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

            if (postagem.tema || postagem.usuario){
            
                if(!postagem.tema){

                    let usuario = await this.usuarioService.findOneById(postagem.usuario.id)
                    
                    if (!usuario)
                        throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
                    
                    return await this.postagemRepository.save(postagem);
                
                }else if(!postagem.usuario){
    
                    let tema = await this.temaService.findOneById(postagem.tema.id)        
                
                    if (!tema)
                    throw new HttpException('Tema não encontrados!', HttpStatus.NOT_FOUND);
    
                    return await this.postagemRepository.save(postagem);
                    
                }else{
    
                    let tema = await this.temaService.findOneById(postagem.tema.id) 
                    let usuario = await this.usuarioService.findOneById(postagem.usuario.id)
    
                    if (!tema || !usuario )
                        throw new HttpException('Tema e/ou Usuário não encontrados!', HttpStatus.NOT_FOUND);
                
                }
                
                return await this.postagemRepository.save(postagem);
    
            }
    
            return await this.postagemRepository.save(postagem);
        
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let postagem = await this.findOneById(id);

        return await this.postagemRepository.delete(id);

    }

}


