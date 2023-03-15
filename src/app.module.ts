import { TransformInterceptor } from './core/interceptos/transform.interceptor';
import { LoggingInterceptor } from './core/interceptos/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration()],
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'depay',
      password: 'depay',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
    },
],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
