import { Test, TestingModule } from '@nestjs/testing';
import { IndicationsService } from './indications.service';
import { PrismaService } from '../prisma.service';
import { CreateIndicationDto } from './dto/create-indication.dto';
import { UpdateIndicationDto } from './dto/update-indication.dto';

describe('IndicationsService', () => {
  let service: IndicationsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicationsService,
        {
          provide: PrismaService,
          useValue: {
            indication: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<IndicationsService>(IndicationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a indication', async () => {
      const createIndicationDto: CreateIndicationDto = {
        year: 2024,
        winner: true,
        movieId: 1,
      };
      const createdIndication = { id: 1, ...createIndicationDto };
      jest
        .spyOn(prismaService.indication, 'create')
        .mockResolvedValue(createdIndication);

      const result = await service.create(createIndicationDto);

      expect(result).toEqual(createdIndication);
    });
  });

  describe('findAll', () => {
    it('should return an array of indications', async () => {
      const indications = [{ id: 1, year: 2024, winner: true, movieId: 1 }];
      jest
        .spyOn(prismaService.indication, 'findMany')
        .mockResolvedValue(indications);

      const result = await service.findAll();
      expect(result).toEqual(indications);
    });
  });

  describe('findOne', () => {
    it('should return a single indication', async () => {
      const indicationId = 1;
      const indication = {
        id: indicationId,
        year: 2024,
        winner: true,
        movieId: 1,
      };
      jest
        .spyOn(prismaService.indication, 'findUniqueOrThrow')
        .mockResolvedValue(indication);

      const result = await service.findOne(indicationId);

      expect(result).toEqual(indication);
    });
  });

  describe('update', () => {
    it('should update an indication', async () => {
      const indicationId = 1;
      const updateIndicationDto: UpdateIndicationDto = {
        year: 2025,
        winner: false,
        movieId: 2,
      };

      const updatedIndication = {
        id: indicationId,
        year: updateIndicationDto.year,
        winner: updateIndicationDto.winner,
        movieId: updateIndicationDto.movieId,
      };
      jest
        .spyOn(prismaService.indication, 'update')
        .mockResolvedValue(updatedIndication as any);

      const result = await service.update(indicationId, updateIndicationDto);

      expect(result).toEqual(updatedIndication);
    });
  });

  describe('remove', () => {
    it('should remove a indication', async () => {
      const indicationId = 1;

      jest.spyOn(prismaService.indication, 'delete').mockResolvedValue({
        id: indicationId,
        year: 2024,
        winner: true,
        movieId: 1,
      });

      await service.remove(indicationId);

      expect(prismaService.indication.delete).toHaveBeenCalledWith({
        where: { id: indicationId },
      });
    });
  });
});
