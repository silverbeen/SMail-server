import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Authorization } from '../../global/authentication';
import { MailRequestDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getMail(@Authorization() as: any) {
    return await this.mailService.getMail(as.userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postMail(@Authorization() as: any, @Body() req: MailRequestDto) {
    return await this.mailService.postMail(as.userId, req);
  }
}
