import { AuthService } from './../auth/auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthType } from './dto/user-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  private deafultAccountEx =
    '0x9D85ca56217D2bb651b00f15e694EB7E713637D4';

  async createUser(createUserDto: CreateUserDto) {
    let user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async getUserByAdress(adress: string) {
    return await this.userRepository.findOne({
      where: { etheriumAdress: adress },
    });
  }

  async signIn(signInDto: UserSignInDto) {
    const user = await this.getUserByAdress(signInDto.etheriumAdress);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isVerified = await this.authService.verify(
      signInDto.message,
      signInDto.signature,
    );
    if (!isVerified) {
      throw new BadRequestException('Signature is not valid');
    }
    return await this.authService.generateToken(user);
  }

  async signUp(signUpDto: UserSignUpDto) {
    const user = await this.getUserByAdress(signUpDto.etheriumAdress);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const isVerified = await this.authService.verify(
      signUpDto.message,
      signUpDto.signature,
    );
    if (!isVerified) {
      throw new BadRequestException('Signature is not valid');
    }
    const etAdress = this.validateStringToHaveAdress(signUpDto.message);
    if (!etAdress) throw new BadRequestException('Wrong credentials');

    const newUser = await this.createUser({
      name: signUpDto.name,
      etheriumAdress: etAdress,
    });
    return await this.authService.generateToken(newUser);
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getProfileInfo(user: UserAuthType) {
    return await user;
  }

  validateStringToHaveAdress(message) {
    try {
      const position = message.search('account:');
      if (position == -1) return false;
      let sliceStart = position + 9;
      let sliceEnd = sliceStart + this.deafultAccountEx.length;
      let accountNumber = message.slice(sliceStart, sliceEnd);
      return accountNumber;
    } catch (e) {
      return false;
    }
  }
}
