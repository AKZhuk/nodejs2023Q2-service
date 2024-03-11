import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Du hast' })
  @IsString()
  name: string;

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @ApiProperty({ description: 'In seconds', type: 'integer', example: 262 })
  @IsNumber()
  duration: number;
}
