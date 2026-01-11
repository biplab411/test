import { IsInt } from 'class-validator';

export class UpdateCorearLocationDto {
  @IsInt()
  lat: number;

  @IsInt()
  lng: number;
}
