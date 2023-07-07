import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from '../../entities/Mail';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mail])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
