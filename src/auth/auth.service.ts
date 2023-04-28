import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateNonce, SiweMessage } from 'siwe';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { }

  async verify(message: string, signature: string) {
    const siweMessage = new SiweMessage(message)
    try {
      let fields = await siweMessage.validate(signature);
      console.log('Inserted nonce', fields.nonce)
      // if (fields.nonce !== nonce) {
      //   return false
      // }
      return true
    } catch (error) {
      return false
    }
  }

  generateNonce() {
    return generateNonce()
  }

  async generateToken(user) {
    const payload = { id: user.id, etheriumAdress: user.etheriumAdress, nonce: this.generateNonce() }
    return {
      token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY })
    }
  }

}
