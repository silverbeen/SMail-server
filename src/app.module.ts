import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './apis/category/category.module';
import { ContentModule } from './apis/content/content.module';
import { UserModule } from './apis/user/user.module';
import { UserdeskModule } from './apis/userdesk/userdesk.module';
import { User } from './entities/User';
import CatchException from './error/CatchException';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './apis/template/template.module';
import { MailModule } from './apis/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/entities/*.{ts,js}'], // Entity 연결
      synchronize: true,
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([User]),
    CategoryModule,
    ContentModule,
    UserModule,
    UserdeskModule,
    TemplateModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
