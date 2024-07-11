import { Injectable } from '@nestjs/common';
import { CreateIndicationDto } from './dto/create-indication.dto';
import { UpdateIndicationDto } from './dto/update-indication.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IndicationsService {
  constructor(private prisma: PrismaService) {}

  async awardsIntervals() {
    const data = await this.prisma.producerAwardsIntervals.findMany();

    const intervals = data.map(({ interval }) => interval);
    const minInterval = Math.min(...intervals);
    const maxInterval = Math.max(...intervals);

    const min = data.filter(
      (awardInterval) => awardInterval.interval === minInterval,
    );

    const max = data.filter(
      (awardInterval) => awardInterval.interval === maxInterval,
    );

    return { min, max };
  }

  create(createIndicationDto: CreateIndicationDto) {
    return this.prisma.indication.create({
      data: createIndicationDto,
    });
  }

  findAll() {
    return this.prisma.indication.findMany();
  }

  findOne(id: number) {
    return this.prisma.indication.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateIndicationDto: UpdateIndicationDto) {
    return this.prisma.indication.update({
      where: { id },
      data: updateIndicationDto,
    });
  }

  remove(id: number) {
    return this.prisma.indication.delete({ where: { id } });
  }
}
