import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Post,
  Body,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.get(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.delete(id);
  }
}
