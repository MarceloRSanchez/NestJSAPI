import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    // @IsEmail()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
