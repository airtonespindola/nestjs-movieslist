import { Injectable } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProducersService {
  constructor(private prisma: PrismaService) {}

  create(createProducerDto: CreateProducerDto) {
    return this.prisma.producer.create({
      data: createProducerDto,
    });
  }

  findAll() {
    return this.prisma.producer.findMany();
  }

  findOne(id: number) {
    return this.prisma.producer.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateProducerDto: UpdateProducerDto) {
    return this.prisma.producer.update({
      where: { id },
      data: updateProducerDto,
    });
  }

  async remove(id: number) {
    await this.prisma.movieProducer.deleteMany({ where: { producerId: id } });
    await this.prisma.producer.delete({ where: { id } });
  }
}
