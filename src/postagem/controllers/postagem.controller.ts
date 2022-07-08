import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException, UseGuards } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { isNumber } from "class-validator";

@ApiBearerAuth()
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller("/postagens")
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) { }
  
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Postagem> {
    
    if(!isNumber(id))
            throw new HttpException('Id inválido!', HttpStatus.BAD_REQUEST);

    return this.postagemService.findOneById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() post: Postagem): Promise<Postagem> {
    return this.postagemService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() post: Postagem): Promise<Postagem> {
    return this.postagemService.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    const resultadoDelete = this.postagemService.delete(id);
    
    if (resultadoDelete === undefined)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    else
        return resultadoDelete;

  }

}
