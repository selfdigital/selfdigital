import { IsNotEmpty } from "class-validator";

export class Oauth2TokenDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
