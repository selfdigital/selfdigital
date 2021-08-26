import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Oauth2TokenDto {
  @ApiProperty({ example: "admin@admin.com" })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "admin" })
  @IsNotEmpty()
  password: string;
}
