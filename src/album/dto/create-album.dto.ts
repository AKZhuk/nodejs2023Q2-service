import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Innuendo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1991 })
  @IsNumber()
  year: number;

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
