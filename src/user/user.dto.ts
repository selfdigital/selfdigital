import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ example: "admin@admin.com" })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: "admin" })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: "admin" })
  @IsNotEmpty()
  readonly password: string;
}
