import { IUserCredentials, IJwtConstants } from './../config/general.configuration.interface';
import { ISignTokenPayloadParam, ISignTokenInfo } from './interfaces/sign-token-payload.interface';
import { Injectable, NotAcceptableException, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcryptjs";

export interface ISignOptions {
  timeMulti?: number;
}

@Injectable()
export class AuthService {
  private _jwtConstants: IJwtConstants;

  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this._jwtConstants = this._configService.get<IJwtConstants>('jwtConstants');
  }

  signToken(signTokenPayload: ISignTokenPayloadParam, options?: ISignOptions): string {
    const payload: ISignTokenInfo = {
      sub: signTokenPayload.username,
    };

    return sign(payload, this._jwtConstants.secret, { expiresIn: options?.timeMulti ? this._jwtConstants.expiration * options.timeMulti : this._jwtConstants.expiration });
  }

  async login(username: string, password: string): Promise<boolean> {
    const user: User = await this.usersRepository.findOneOrFail({
      where: { username: username }
    });

    if (username != user.username)
      throw new UnauthorizedException();

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    return true;
  }

  async validateUser(username: string, password: string): Promise<any> {
    console.log('username:', username);
    const user = await this.usersRepository.findOneOrFail({
      where: { username: username }
    });
    
    if (!user) return null;
    
    const passwordValid = await bcrypt.compare(password, user.password)
    console.log(passwordValid);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
}
