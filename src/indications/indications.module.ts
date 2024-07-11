import { Module } from '@nestjs/common';
import { IndicationsService } from './indications.service';
import { IndicationsController } from './indications.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [IndicationsController],
  providers: [IndicationsService, PrismaService],
})
export class IndicationsModule {}
