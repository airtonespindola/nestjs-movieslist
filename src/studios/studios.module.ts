import { Module } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [StudiosController],
  providers: [StudiosService, PrismaService],
})
export class StudiosModule {}
