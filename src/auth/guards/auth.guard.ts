import { IUserCredentials } from './../../config/general.configuration.interface';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { IJwtConstants } from 'src/config/general.configuration.interface';
import { ISignTokenInfo } from '../interfaces/sign-token-payload.interface';
import { isObject, isString } from 'class-validator';
import { ObjectsUtils } from 'src/utils/objects-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly _configService: ConfigService, @InjectRepository(User)
    private usersService: UsersService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            return false;
        }

        const decode: ISignTokenInfo = await this.validateToken(request.headers.authorization);

        const credentials: IUserCredentials = this._configService.get<IUserCredentials>('credentials');
        const user: User = await this.usersService.findOne(1);

        if (decode.sub != user.username) {
            throw new UnauthorizedException();
        }

        return true;
    }

    async validateToken(auth: any): Promise<ISignTokenInfo> {
        if (auth.split(' ')[0]?.toLowerCase() !== 'bearer') {
            throw new UnauthorizedException();
        }
        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return isString(decoded) ? JSON.parse(decoded) as ISignTokenInfo : decoded as ISignTokenInfo;
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}
