import { IsNotEmpty, IsString } from 'class-validator';

export class TemplateRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly desk_text: string;
}
