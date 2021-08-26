import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PortfolioDto {
  @ApiProperty({ example: "Here image code" })
  @IsNotEmpty()
  @Length(16, 16)
  readonly cover: string;

  @ApiProperty({ example: "username" })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: "Here about username" })
  @IsNotEmpty()
  readonly description: string;
}
