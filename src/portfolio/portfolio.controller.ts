import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { PortfolioDto } from "./portfolio.dto";

@Controller("/api/v1")
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get("portfolios")
  getAllPortfolios() {
    return this.portfolioService.getAllPortfolios();
  }

  @Post("portfolio")
  createPortfolio(@Body() portfolioDto: PortfolioDto) {
    return this.portfolioService.createPortfolio(portfolioDto);
  }

  @Get("portfolio/:id")
  getPortfolio(@Param("id") id: number) {
    return this.portfolioService.getPortfolio(id);
  }

  @Patch("portfolio/:id")
  updatePortfolio(@Param("id") id: number, @Body() portfolioDto: PortfolioDto) {
    return this.portfolioService.updatePortfolio(id, portfolioDto);
  }

  @Delete("portfolio/:id")
  deletePortfolio(@Param("id") id: number) {
    return this.portfolioService.deletePortfolio(id);
  }
}
