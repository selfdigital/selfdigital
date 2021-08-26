import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { ServiceService } from "./service.service";
import { DatabaseModule } from "../database/database.module";
import { serviceProvider } from "./service.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceController],
  providers: [ServiceService, ...serviceProvider]
})
export class ServiceModule {}
