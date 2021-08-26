import { MiddlewareConsumer, Module } from "@nestjs/common";
import { Oauth2Controller } from "./oauth2.controller";
import { Oauth2Service } from "./oauth2.service";
import { oauth2Providers } from "./oauth2.providers";
import { DatabaseModule } from "../database/database.module";
import { AcceptHeaderMiddleware } from "../middleware/accept-header.middleware";

@Module({
  imports: [DatabaseModule],
  controllers: [Oauth2Controller],
  providers: [Oauth2Service, ...oauth2Providers],
  exports: [...oauth2Providers]
})
export class Oauth2Module {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AcceptHeaderMiddleware).forRoutes("*");
  }
}
