import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { BlogModule } from "./blog/blog.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { ServiceModule } from "./service/service.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { PermissionModule } from "./permission/permission.module";
import { Oauth2Module } from "./oauth2/oauth2.module";

@Module({
  imports: [
    BlogModule,
    DatabaseModule,
    PortfolioModule,
    ServiceModule,
    UploadModule,
    UserModule,
    PermissionModule,
    Oauth2Module
  ]
})
export class AppModule {}
