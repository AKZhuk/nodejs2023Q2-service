import { Controller, Get, Param, Delete, HttpCode, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) { }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.get(id)
  }

  @Post()
  async create(@Body() createUserDto) {
    return this.userService.create(createUserDto);

  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto) {
    return this.userService.update(id, UpdateUserDto);

  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
