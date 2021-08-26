import { HttpException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserDto } from "./user.dto";
import { hashSync } from "bcryptjs";
import { bcryptSalt } from "../config";
import { Request } from "express";
import { Oauth2TokenRepository } from "../oauth2/repositories/oauth2-token.repository";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: typeof UserRepository,
    @Inject("OAUTH2_TOKEN_REPOSITORY") private oauth2TokenRepository: typeof Oauth2TokenRepository
  ) {}

  getUsers() {
    return this.userRepository.findAll();
  }

  async getMe(request: Request) {
    const token = request.header("Authorization").slice(7);

    const tokenModel = await this.oauth2TokenRepository.findOne({
      where: { accessToken: token },
      attributes: ["user"]
    });

    const { user: userId } = tokenModel.get({ plain: true });

    return this.userRepository.findByPk(userId as unknown as number);
  }

  /// AuthModule.AuthService
  async findUser(email: string) {
    const model = await this.userRepository.findOne({ where: { email } });
    if (!model) return null;
    return model.get({ plain: true });
  }

  async createUser(user: UserDto): Promise<UserRepository> {
    try {
      const password = hashSync(user.password, bcryptSalt);
      return await this.userRepository.create({ ...user, password });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError")
        throw new HttpException("Email can't be registered", 404);
    }
  }
}
