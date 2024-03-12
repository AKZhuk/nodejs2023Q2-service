import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: " The user's old password" })
  @IsString()
  oldPassword: string; // previous password

  @ApiProperty({ description: " The user's new password" })
  @IsString()
  newPassword: string; // new password
}
