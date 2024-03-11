import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString({ message: 'Please Enter Name' })
  @IsNotEmpty({ message: 'Please Enter Name' })
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
