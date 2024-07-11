import { IsBoolean, IsInt } from 'class-validator';

export class CreateIndicationDto {
  @IsInt()
  year: number;

  @IsBoolean()
  winner: boolean;

  @IsInt()
  movieId: number;
}
