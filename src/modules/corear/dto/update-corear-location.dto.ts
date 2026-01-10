// src/corear/dto/update-corear-location.dto.ts
import { IsInt } from 'class-validator';

export class UpdateCorearLocationDto {
  @IsInt()
  lat: number;

  @IsInt()
  lng: number;
}
