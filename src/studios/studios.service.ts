import { Injectable } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudiosService {
  constructor(private prisma: PrismaService) {}

  create(createStudioDto: CreateStudioDto) {
    return this.prisma.studio.create({
      data: createStudioDto,
    });
  }

  findAll() {
    return this.prisma.studio.findMany();
  }

  findOne(id: number) {
    return this.prisma.studio.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return this.prisma.studio.update({
      where: { id },
      data: updateStudioDto,
    });
  }

  async remove(id: number) {
    await this.prisma.movieStudio.deleteMany({ where: { studioId: id } });
    await this.prisma.studio.delete({ where: { id } });
  }
}
