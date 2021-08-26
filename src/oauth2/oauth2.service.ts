import { Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Oauth2TokenDto } from "./dto/oauth2-token.dto";
import OAuth2Server, { Request as ORequest, Response as OResponse } from "oauth2-server";
import {
  accessTokenExpireTime,
  authorizationCodeExpireTime,
  refreshTokenExpireTime
} from "../config";
import { Sequelize } from "sequelize-typescript";
import { oauth2Model } from "./oauth2.model";

const authorizationCodeLifetime = authorizationCodeExpireTime * 1e3;
const accessTokenLifetime = accessTokenExpireTime * 1e3;
const refreshTokenLifetime = refreshTokenExpireTime * 1e3;

@Injectable()
export class Oauth2Service {
  private readonly OAuth2Model: OAuth2Server;

  constructor(@Inject("SEQUELIZE") private sequelize: Sequelize) {
    this.OAuth2Model = new OAuth2Server({
      authorizationCodeLifetime,
      accessTokenLifetime,
      refreshTokenLifetime,
      model: oauth2Model(sequelize, {
        OAuth2Client: "Oauth2ClientRepository",
        OAuth2Code: "Oauth2CodeRepository",
        OAuth2Scope: "Oauth2ScopeRepository",
        OAuth2State: "Oauth2StateRepository",
        OAuth2Token: "Oauth2TokenRepository",
        User: `UserRepository`
      })
    });
  }

  async getToken(oauth2TokenDto: Oauth2TokenDto, request: Request, response: Response) {
    request.body.client_id = "application";
    request.body.client_secret = "application";
    request.body.grant_type = "password";

    const req = new ORequest(request);
    const res = new OResponse(response);

    const token = await this.OAuth2Model.token(req, res);
    const { accessToken, accessTokenExpiresAt, refreshToken, scope } = token;
    return { accessToken, accessTokenExpiresAt, refreshToken, scope: scope || "" };
  }
}
