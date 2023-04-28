import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserAuthType {
  @IsNumber()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  etheriumAdress: string;

  @IsString()
  @IsNotEmpty()
  nonce: string;
}
