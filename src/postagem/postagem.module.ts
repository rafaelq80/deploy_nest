import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { TemaService } from "../tema/services/tema.service";
import { TemaModule } from "../tema/tema.module";
import { UsuarioService } from "../usuario/services/usuario.service";
import { UsuarioModule } from "../usuario/usuario.module";
import { PostagemController } from "./controllers/postagem.controller";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule, UsuarioModule],
    providers: [PostagemService, TemaService, UsuarioService, Bcrypt],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule {}


