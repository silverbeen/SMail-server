import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from '../../entities/Template';
import { TemplateRequestDto } from './dto/template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async getTemplate(user_id: string) {
    const template = await this.templateRepository
      .createQueryBuilder('template')
      .select('template.templateTitle', 'title')
      .addSelect('template.templateContent', 'content')
      .addSelect('template.templateId', 'id')
      .where({ userId: user_id })
      .getRawMany();

    return template;
  }

  async createTemplate(user_id: string, templateRequest: TemplateRequestDto) {
    const item = new Template();
    item.userId = user_id;
    item.templateTitle = templateRequest.title;
    item.templateContent = templateRequest.desk_text;

    return await this.templateRepository.save(item);
  }

  async deleteTemplate(template_id: number) {
    return await this.templateRepository
      .createQueryBuilder('template')
      .delete()
      .where('template.template_id=:id', { id: template_id })
      .execute();
  }
}
