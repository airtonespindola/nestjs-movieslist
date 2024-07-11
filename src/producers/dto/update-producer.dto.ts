import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';
import { IsString } from 'class-validator';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {
  @IsString()
  name: string;
}
