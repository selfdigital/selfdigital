import { IsNotEmpty } from "class-validator";

export class PortfolioDto {
  @IsNotEmpty()
  readonly cover: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;
}
