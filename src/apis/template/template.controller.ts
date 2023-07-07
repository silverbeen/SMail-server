import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Authorization } from '../../global/authentication';
import { TemplateRequestDto } from './dto/template.dto';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTemplate(@Authorization() as: any) {
    return await this.templateService.getTemplate(as.userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTemplate(
    @Authorization() as: any,
    @Body() request: TemplateRequestDto,
  ) {
    return await this.templateService.createTemplate(as.userId, request);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTemplate(@Authorization() as: any, @Body() template_id: any) {
    return await this.templateService.deleteTemplate(template_id.template_id);
  }
}
