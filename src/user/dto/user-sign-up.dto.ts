import { IsNotEmpty, IsString } from "class-validator";

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  etheriumAdress: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  @IsNotEmpty()
  signature: string
}