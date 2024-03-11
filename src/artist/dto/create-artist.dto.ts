import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Please Enter Name' })
  @IsNotEmpty({ message: 'Please Enter Name' })
  name: string;
  @IsBoolean()
  grammy: boolean;
}
