import { IsString } from 'class-validator';

export class MailRequestDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
