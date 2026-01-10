// src/corear/dto/create-corear.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCorearDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  lat: number;

  @IsInt()
  lng: number;
}
