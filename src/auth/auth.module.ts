import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/user.module';
import { UsersService } from 'src/users/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local-auth.guard';
import { JwtStrategy } from './guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
        secret: process.env.SECRET_KEY,
        signOptions: {
            expiresIn: '1d',
            algorithm: 'HS384',
        },
        verifyOptions: {
            algorithms: ['HS384'],
        },
    }),
    UsersModule,
    PassportModule
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
