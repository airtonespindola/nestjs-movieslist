import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: number) {
    return this.prisma.movie.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({ where: { id } });
  }
}
