import { Sequelize } from "sequelize-typescript";
import { BlogRepository } from "../blog/blog.repository";
import { PortfolioRepository } from "../portfolio/portfolio.repository";
import { UploadRepository } from "../upload/upload.repository";
import { ServiceRepository } from "../service/service.repository";
import { UserRepository } from "../user/user.repository";
import { Oauth2CodeRepository } from "../oauth2/repositories/oauth2-code.repository";
import { Oauth2StateRepository } from "../oauth2/repositories/oauth2-state.repository";
import { Oauth2ScopeRepository } from "../oauth2/repositories/oauth2-scope.repository";
import { Oauth2TokenRepository } from "../oauth2/repositories/oauth2-token.repository";
import { Oauth2ClientRepository } from "../oauth2/repositories/oauth2-client.repository";

const models = [
  BlogRepository,
  PortfolioRepository,
  UploadRepository,
  ServiceRepository,
  UserRepository,
  Oauth2CodeRepository,
  Oauth2StateRepository,
  Oauth2ScopeRepository,
  Oauth2TokenRepository,
  Oauth2ClientRepository
];

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    async useFactory(): Promise<Sequelize> {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      });
      sequelize.addModels(models);
      await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
      const mainClient = await Oauth2ClientRepository.findByPk("application");

      if (!mainClient) {
        await Oauth2ClientRepository.create({
          id: "application",
          appName: "application",
          clientId: "application",
          clientSecret: "application",
          grants: ["password"]
        });
      } else {
        await mainClient
          .setAttributes({
            id: "application",
            appName: "application",
            clientId: "application",
            clientSecret: "application",
            grants: ["password"]
          })
          .save();
      }

      return sequelize;
    }
  }
];
