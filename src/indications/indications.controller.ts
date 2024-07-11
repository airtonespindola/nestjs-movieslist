import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IndicationsService } from './indications.service';
import { CreateIndicationDto } from './dto/create-indication.dto';
import { UpdateIndicationDto } from './dto/update-indication.dto';

@Controller('indications')
export class IndicationsController {
  constructor(private readonly indicationsService: IndicationsService) {}

  @Get('awards-intervals')
  awardsIntervals() {
    return this.indicationsService.awardsIntervals();
  }

  @Post()
  create(@Body() createIndicationDto: CreateIndicationDto) {
    return this.indicationsService.create(createIndicationDto);
  }

  @Get()
  findAll() {
    return this.indicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indicationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndicationDto: UpdateIndicationDto,
  ) {
    return this.indicationsService.update(+id, updateIndicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indicationsService.remove(+id);
  }
}
