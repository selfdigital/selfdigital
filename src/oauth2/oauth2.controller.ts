import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { Oauth2Service } from "./oauth2.service";
import { Oauth2TokenDto } from "./dto/oauth2-token.dto";

@Controller("o/oauth2/v2")
export class Oauth2Controller {
  constructor(private oauth2Service: Oauth2Service) {}

  @Post("token")
  getToken(
    @Body() oauth2TokenDto: Oauth2TokenDto,
    @Req() request: Request,
    @Res() response: Response
  ) {
    this.oauth2Service
      .getToken(oauth2TokenDto, request, response)
      .then(resp => response.json(resp));
  }

  @Post("token/refresh")
  refreshToken() {
    return {};
  }

  @Post("token/code")
  authorizeCode() {
    return {};
  }

  @Post("authorize")
  authorize() {
    return {};
  }
}
