import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiHideProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  redirect(@Res() res) {
    return res.redirect('/swagger');
  }
}