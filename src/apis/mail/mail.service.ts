import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mail } from '../../entities/Mail';
import { MailRequestDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
  ) {}

  async getMail(userId: string) {
    return await this.mailRepository.findOne({ userId: userId });
  }

  async postMail(userId: string, req: MailRequestDto) {
    const isMail = await this.mailRepository.findOne({ userId: userId });

    const mail = new Mail();
    mail.userId = userId;
    mail.mailContent = req.content;
    mail.mailTitle = req.title;

    if (isMail) {
      return await this.mailRepository.update(isMail.mailId, mail);
    } else {
      return await this.mailRepository.save(mail);
    }
  }
}
