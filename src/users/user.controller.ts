import { User } from './user.entity';
import { Body, Controller, Delete, Get, Patch, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CommonErrorResponse } from './../core/common/common-error-response';
import { CommonSuccessResponse } from './../core/common/common-success-response';
import { ICommonResponse } from 'src/core/interfaces/common-success-response.interface';
import { validate } from "class-validator";

const controllerConfig = {
    name: 'user'
};

@ApiBearerAuth()
@ApiTags(controllerConfig.name)
@Controller(controllerConfig.name)
export class UsersController {
    constructor(private readonly _userService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('findAll')
    @ApiOkResponse({
        type: Object
    })
    @ApiBadRequestResponse({
        type: CommonErrorResponse
    })
    async findAll(): Promise<any> {
        const res = await this._userService.findAll();
        if (!res)
            return new CommonErrorResponse();

        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('findOne')
    @ApiQuery({
        name: 'id'
    })
    @ApiOkResponse({
        type: Object
    })
    @ApiBadRequestResponse({
        type: CommonErrorResponse
    })
    async findOne(@Query('id') id: number): Promise<any> {
        const res = await this._userService.findOne(id);
        if (!res)
            return new CommonErrorResponse("User not found", 404);

        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('remove')
    @ApiQuery({
        name: 'id'
    })
    @ApiOkResponse({
        type: CommonSuccessResponse
    })
    @ApiBadRequestResponse({
        type: CommonErrorResponse
    })
    async remove(@Query('id') id: number): Promise<any> {
        try {
            await this._userService.remove(id);
        } catch (error) {
            return new CommonErrorResponse("User not found", 404);
        }

        return new CommonSuccessResponse("User Deleted", 204);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @ApiOkResponse({
        type: CommonSuccessResponse
    })
    @ApiBadRequestResponse({
        type: CommonErrorResponse
    })
    async create(@Body() user: User): Promise<ICommonResponse> {
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return new CommonErrorResponse(errors.toString(), 400);
        }
        try {
            await this._userService.create(user);
        } catch (error) {
            return new CommonErrorResponse("Username already in use", 409);
        }

        return new CommonSuccessResponse("User created", 201);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('edit')
    @ApiQuery({
        name: 'id'
    })
    @ApiOkResponse({
        type: CommonSuccessResponse
    })
    @ApiBadRequestResponse({
        type: CommonErrorResponse
    })
    async edit(@Query('id') id: number, @Body() user: User): Promise<ICommonResponse> {
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return new CommonErrorResponse(errors.toString(), 400);
        }
        try {
            const dbUser = await this._userService.findOne(id);
            if (!dbUser)
                return new CommonErrorResponse("User not found", 404);

            dbUser.username = user.username;
            dbUser.role = user.role;

            await this._userService.edit(dbUser);
        } catch (error) {
            return new CommonErrorResponse("Username already in use", 409);
        }

        return new CommonSuccessResponse("User updated", 204);
    }
}
