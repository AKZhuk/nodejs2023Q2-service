import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  duration: number;
}
