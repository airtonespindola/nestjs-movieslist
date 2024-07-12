import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { PrismaService } from '../prisma.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

describe('ProducersService', () => {
  let service: ProducersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: PrismaService,
          useValue: {
            producer: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            movieProducer: {
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a producer', async () => {
      const createProducerDto: CreateProducerDto = { name: 'Producer Name' };
      const createdProducer = { id: 1, ...createProducerDto };
      jest
        .spyOn(prismaService.producer, 'create')
        .mockResolvedValue(createdProducer);

      const result = await service.create(createProducerDto);

      expect(result).toEqual(createdProducer);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const producers = [{ id: 1, name: 'Producer 1' }];
      jest
        .spyOn(prismaService.producer, 'findMany')
        .mockResolvedValue(producers);

      const result = await service.findAll();
      expect(result).toEqual(producers);
    });
  });

  describe('findOne', () => {
    it('should return a single producer', async () => {
      const producerId = 1;
      const producer = { id: producerId, name: 'Producer 1' };
      jest
        .spyOn(prismaService.producer, 'findUniqueOrThrow')
        .mockResolvedValue(producer);

      const result = await service.findOne(producerId);

      expect(result).toEqual(producer);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const producerId = 1;
      const updateProducerDto: UpdateProducerDto = {
        name: 'Updated Producer Name',
      };
      const updatedProducer = {
        id: producerId,
        ...updateProducerDto,
      };
      jest
        .spyOn(prismaService.producer, 'update')
        .mockResolvedValue(updatedProducer);

      const result = await service.update(producerId, updateProducerDto);

      expect(result).toEqual(updatedProducer);
    });
  });

  describe('remove', () => {
    it('should remove a producer', async () => {
      const producerId = 1;
      jest
        .spyOn(prismaService.movieProducer, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest
        .spyOn(prismaService.producer, 'delete')
        .mockResolvedValue({ id: producerId, name: 'Producer 1' });

      await service.remove(producerId);

      expect(prismaService.movieProducer.deleteMany).toHaveBeenCalledWith({
        where: { producerId },
      });

      expect(prismaService.producer.delete).toHaveBeenCalledWith({
        where: { id: producerId },
      });
    });
  });
});
