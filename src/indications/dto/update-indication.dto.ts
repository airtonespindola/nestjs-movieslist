import { PartialType } from '@nestjs/mapped-types';
import { CreateIndicationDto } from './create-indication.dto';

export class UpdateIndicationDto extends PartialType(CreateIndicationDto) {}
