import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
