import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ServiceDto {
  @ApiProperty({ example: "admin" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Here little about this" })
  @IsNotEmpty()
  miniDescription: string;

  @ApiProperty({ example: "Here image code" })
  @IsNotEmpty()
  @Length(16, 16)
  cover: string;

  @ApiProperty({ example: "Here about service" })
  @IsNotEmpty()
  description: string;
}
