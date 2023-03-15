import { LoginUserDTO } from './dto/login-user.dto';
import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
const controllerConfig = {
  name: 'auth'
};

@ApiTags(controllerConfig.name)
@Controller(controllerConfig.name)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

 
  @Post('login')
  @ApiOkResponse({
    type: '{ access_token: String }'
  })
  @ApiBadRequestResponse({
    type: UnauthorizedException
  })
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const res = await this._authService.login(loginUserDTO.username, loginUserDTO.password);
    if (!res)
      throw new UnauthorizedException();

    const payload = { username: loginUserDTO.username };

    const token: string = await this._authService.signToken(payload);
    return {
        access_token: token,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @ApiOkResponse({
    type: Boolean
  })
  @ApiBadRequestResponse({
    type: UnauthorizedException
  })
  async logout() {
      return true;
  }
}
