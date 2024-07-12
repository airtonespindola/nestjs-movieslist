import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: {
            movie: {
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

    service = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieDto = { name: 'Movie Name' };
      const createdMovie = { id: 1, ...createMovieDto };
      jest.spyOn(prismaService.movie, 'create').mockResolvedValue(createdMovie);

      const result = await service.create(createMovieDto);

      expect(result).toEqual(createdMovie);
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [{ id: 1, name: 'Movie 1' }];
      jest.spyOn(prismaService.movie, 'findMany').mockResolvedValue(movies);

      const result = await service.findAll();
      expect(result).toEqual(movies);
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const movieId = 1;
      const movie = { id: movieId, name: 'Movie 1' };
      jest
        .spyOn(prismaService.movie, 'findUniqueOrThrow')
        .mockResolvedValue(movie);

      const result = await service.findOne(movieId);

      expect(result).toEqual(movie);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const movieId = 1;
      const updateMovieDto: UpdateMovieDto = {
        name: 'Updated Movie Name',
      };
      const updatedMovie = {
        id: movieId,
        name: '',
        ...updateMovieDto,
      };
      jest.spyOn(prismaService.movie, 'update').mockResolvedValue(updatedMovie);

      const result = await service.update(movieId, updateMovieDto);

      expect(result).toEqual(updatedMovie);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      const movieId = 1;

      jest
        .spyOn(prismaService.movie, 'delete')
        .mockResolvedValue({ id: movieId, name: 'Movie 1' });

      await service.remove(movieId);

      expect(prismaService.movie.delete).toHaveBeenCalledWith({
        where: { id: movieId },
      });
    });
  });
});
