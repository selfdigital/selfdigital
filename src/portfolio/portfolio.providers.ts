import { PortfolioRepository } from "./portfolio.repository";

export const portfolioProviders = [
  {
    provide: "PORTFOLIO_REPOSITORY",
    useValue: PortfolioRepository
  }
];
