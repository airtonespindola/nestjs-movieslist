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

describe('IndicationsService - awardsIntervals', () => {
  let service: IndicationsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicationsService,
        {
          provide: PrismaService,
          useValue: {
            producerAwardsIntervals: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<IndicationsService>(IndicationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return the correct intervals for min and max', async () => {
    const mockData = [
      {
        producer: 'Producer A',
        interval: 2,
        previousWin: 2000,
        followWin: 2002,
      },
      {
        producer: 'Producer B',
        interval: 4,
        previousWin: 2001,
        followWin: 2005,
      },
      {
        producer: 'Producer C',
        interval: 4,
        previousWin: 1999,
        followWin: 2003,
      },
      {
        producer: 'Producer D',
        interval: 1,
        previousWin: 2010,
        followWin: 2011,
      },
    ];
    jest
      .spyOn(prismaService.producerAwardsIntervals, 'findMany')
      .mockResolvedValue(mockData);

    const result = await service.awardsIntervals();

    expect(result).toEqual({
      min: [
        {
          producer: 'Producer D',
          interval: 1,
          previousWin: 2010,
          followWin: 2011,
        },
      ],
      max: [
        {
          producer: 'Producer B',
          interval: 4,
          previousWin: 2001,
          followWin: 2005,
        },
        {
          producer: 'Producer C',
          interval: 4,
          previousWin: 1999,
          followWin: 2003,
        },
      ],
    });
  });

  it('should return an empty array for min and max when no data is found', async () => {
    jest
      .spyOn(prismaService.producerAwardsIntervals, 'findMany')
      .mockResolvedValue([]);

    const result = await service.awardsIntervals();

    expect(result).toEqual({ min: [], max: [] });
  });

  it('should return the same producer for both min and max when only one producer is found', async () => {
    const mockData = [
      {
        producer: 'Producer A',
        interval: 3,
        previousWin: 2000,
        followWin: 2003,
      },
    ];
    jest
      .spyOn(prismaService.producerAwardsIntervals, 'findMany')
      .mockResolvedValue(mockData);

    const result = await service.awardsIntervals();

    expect(result).toEqual({
      min: [
        {
          producer: 'Producer A',
          interval: 3,
          previousWin: 2000,
          followWin: 2003,
        },
      ],
      max: [
        {
          producer: 'Producer A',
          interval: 3,
          previousWin: 2000,
          followWin: 2003,
        },
      ],
    });
  });

  it('should handle a large dataset correctly', async () => {
    const mockData = Array.from({ length: 1000 }, (_, i) => ({
      producer: `Producer ${i}`,
      interval: Math.floor(Math.random() * 100),
      previousWin: 2000 + i,
      followWin: 2000 + i + Math.floor(Math.random() * 10),
    }));
    jest
      .spyOn(prismaService.producerAwardsIntervals, 'findMany')
      .mockResolvedValue(mockData);

    const result = await service.awardsIntervals();

    const intervals = mockData.map(({ interval }) => interval);
    const minInterval = Math.min(...intervals);
    const maxInterval = Math.max(...intervals);

    const min = mockData.filter(
      (awardInterval) => awardInterval.interval === minInterval,
    );
    const max = mockData.filter(
      (awardInterval) => awardInterval.interval === maxInterval,
    );

    expect(result).toEqual({ min, max });
  });
});
