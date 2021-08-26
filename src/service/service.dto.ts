import { IsNotEmpty, IsString, Length } from "class-validator";

export class ServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  miniDescription: string;

  @IsNotEmpty()
  @Length(16, 16)
  cover: string;

  @IsNotEmpty()
  description: string;
}
