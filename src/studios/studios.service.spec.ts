import { Test, TestingModule } from '@nestjs/testing';
import { StudiosService } from './studios.service';
import { PrismaService } from '../prisma.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';

describe('StudiosService', () => {
  let service: StudiosService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudiosService,
        {
          provide: PrismaService,
          useValue: {
            studio: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            movieStudio: {
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StudiosService>(StudiosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a studio', async () => {
      const createStudioDto: CreateStudioDto = { name: 'Studio Name' };
      const createdStudio = { id: 1, ...createStudioDto };
      jest
        .spyOn(prismaService.studio, 'create')
        .mockResolvedValue(createdStudio);

      const result = await service.create(createStudioDto);

      expect(result).toEqual(createdStudio);
    });
  });

  describe('findAll', () => {
    it('should return an array of studios', async () => {
      const studios = [{ id: 1, name: 'Studio 1' }];
      jest.spyOn(prismaService.studio, 'findMany').mockResolvedValue(studios);

      const result = await service.findAll();
      expect(result).toEqual(studios);
    });
  });

  describe('findOne', () => {
    it('should return a single studio', async () => {
      const studioId = 1;
      const studio = { id: studioId, name: 'Studio 1' };
      jest
        .spyOn(prismaService.studio, 'findUniqueOrThrow')
        .mockResolvedValue(studio);

      const result = await service.findOne(studioId);

      expect(result).toEqual(studio);
    });
  });

  describe('update', () => {
    it('should update a studio', async () => {
      const studioId = 1;
      const updateStudioDto: UpdateStudioDto = { name: 'Updated Studio Name' };
      const updatedStudio = { id: studioId, name: '', ...updateStudioDto };
      jest
        .spyOn(prismaService.studio, 'update')
        .mockResolvedValue(updatedStudio);

      const result = await service.update(studioId, updateStudioDto);

      expect(result).toEqual(updatedStudio);
    });
  });

  describe('remove', () => {
    it('should remove a studio', async () => {
      const studioId = 1;
      jest
        .spyOn(prismaService.movieStudio, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest
        .spyOn(prismaService.studio, 'delete')
        .mockResolvedValue({ id: studioId, name: 'Studio 1' });

      await service.remove(studioId);

      expect(prismaService.movieStudio.deleteMany).toHaveBeenCalledWith({
        where: { studioId },
      });

      expect(prismaService.studio.delete).toHaveBeenCalledWith({
        where: { id: studioId },
      });
    });
  });
});
