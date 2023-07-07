import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../../entities/Content';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { DeskContent } from '../../entities/DeskContent';

@Module({
  imports: [TypeOrmModule.forFeature([Content, DeskContent])],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
