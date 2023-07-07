import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../entities/Content';
import { DeskContent } from '../../entities/DeskContent';
import { UserDesk } from '../../entities/UserDesk';
import { UserdeskController } from './userdesk.controller';
import { UserdeskService } from './userdesk.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDesk, DeskContent, Content])],
  providers: [UserdeskService],
  controllers: [UserdeskController],
})
export class UserdeskModule {}
