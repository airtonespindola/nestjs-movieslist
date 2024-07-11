import { IsString } from 'class-validator';

export class CreateStudioDto {
  @IsString()
  name: string;
}
