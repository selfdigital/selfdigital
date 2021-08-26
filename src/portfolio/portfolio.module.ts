import { Module } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { PortfolioController } from "./portfolio.controller";
import { portfolioProviders } from "./portfolio.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [PortfolioService, ...portfolioProviders],
  controllers: [PortfolioController]
})
export class PortfolioModule {}
