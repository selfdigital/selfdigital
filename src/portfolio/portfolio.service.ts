import { Inject, Injectable } from "@nestjs/common";
import { PortfolioRepository } from "./portfolio.repository";
import { PortfolioDto } from "./portfolio.dto";

@Injectable()
export class PortfolioService {
  constructor(
    @Inject("PORTFOLIO_REPOSITORY") private portfolioRepository: typeof PortfolioRepository
  ) {}

  getAllPortfolios(): Promise<PortfolioRepository[]> {
    return this.portfolioRepository.findAll<PortfolioRepository>();
  }

  async createPortfolio(portfolioDto: PortfolioDto) {}

  async getPortfolio(id: number) {}

  async updatePortfolio(id: number, portfolioDto: PortfolioDto) {}

  async deletePortfolio(id: number) {}
}
