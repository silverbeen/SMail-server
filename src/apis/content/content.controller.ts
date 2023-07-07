import { Controller, Get, Query } from '@nestjs/common';
import { Authorization } from '../../global/authentication';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // 카테고리 필터링
  @Get()
  async getContentList(@Authorization() as: any, @Query('id') id: number) {
    return await this.contentService.getContentList(as.deskId, id);
  }
}
