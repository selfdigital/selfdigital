import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserProvider } from "./user.provider";
import { DatabaseModule } from "../database/database.module";
import { Oauth2Module } from "../oauth2/oauth2.module";

@Module({
  imports: [DatabaseModule, Oauth2Module],
  providers: [UserService, ...UserProvider],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
