import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from '../../entities/Template';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
