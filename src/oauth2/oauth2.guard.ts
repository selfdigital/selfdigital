import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  SetMetadata
} from "@nestjs/common";
import { Request } from "express";
import { Oauth2TokenRepository } from "./repositories/oauth2-token.repository";

@Injectable()
export class Oauth2Guard implements CanActivate {
  constructor(
    @Inject("OAUTH2_TOKEN_REPOSITORY") private oauth2TokenRepository: typeof Oauth2TokenRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.header("Authorization");
    const token = auth.slice(7);

    if (!auth.toLowerCase().startsWith("bearer")) throw new UnauthorizedException();
    const tokenModel = await this.oauth2TokenRepository.findOne({ where: { accessToken: token } });
    if (!tokenModel) throw new UnauthorizedException();

    return true;
  }
}
