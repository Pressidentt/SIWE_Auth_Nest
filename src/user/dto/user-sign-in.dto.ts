import { IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto{
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