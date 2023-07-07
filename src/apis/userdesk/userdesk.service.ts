import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../../entities/Content';
import { DeskContent } from '../../entities/DeskContent';
import { UserDesk } from '../../entities/UserDesk';

@Injectable()
export class UserdeskService {
  constructor(
    @InjectRepository(UserDesk)
    private readonly userDeskRepository: Repository<UserDesk>,
    @InjectRepository(DeskContent)
    private readonly deskContentRepository: Repository<DeskContent>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  // 서랍 가져오기
  async getDeskContent(id: string) {
    const userDesk = await this.userDeskRepository.findOne({ userUserId: id });

    const deskContent = await this.deskContentRepository
      .createQueryBuilder('desk_content')
      .select('desk_content_id', 'id')
      .leftJoin('desk_content.content', 'content')
      .addSelect('content.content_id', 'contentId')
      .addSelect('content.content', 'content')
      .getRawMany();

    return { userDeskId: userDesk.userDeskId, deskContent };
  }

  // 서랍 넣기
  async putDeskContent(desk_id: number, content_id: number) {
    const desk = await this.userDeskRepository.findOne({ userDeskId: desk_id });
    const content = await this.contentRepository.findOne(content_id);

    const isDeskContent = await this.deskContentRepository.findOne({
      deskContentId: content.contentId,
    });

    // 같은 content가 있다면 추가 못하게 하기
    if (isDeskContent) throw new BadRequestException();

    const deskContent = new DeskContent();
    deskContent.userDeskId = desk_id;
    deskContent.contentId = content_id;
    deskContent.userDesk = desk;
    deskContent.content = content;

    await this.deskContentRepository.save(deskContent);

    return;
  }

  async deleteDeskContent(desk_id: number, desk_content_id: number) {
    return await this.deskContentRepository
      .createQueryBuilder('desk_content')
      .delete()
      .where('desk_content.user_desk_id=:desk_id', { desk_id: desk_id })
      .andWhere('desk_content.desk_content_id=:id', { id: desk_content_id })
      .execute();
  }
}
