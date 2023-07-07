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
import { UserdeskService } from './userdesk.service';

@Controller('userdesk')
export class UserdeskController {
  constructor(private readonly userdeskService: UserdeskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getDeskContent(@Authorization() as: any) {
    return await this.userdeskService.getDeskContent(as.userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postDeskContent(@Authorization() as: any, @Body() contentId: number) {
    return await this.userdeskService.putDeskContent(as.deskId, contentId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDeskContent(
    @Authorization() as: any,
    @Body() deskContentId: any,
  ) {
    return await this.userdeskService.deleteDeskContent(
      as.deskId,
      deskContentId.id,
    );
  }
}
