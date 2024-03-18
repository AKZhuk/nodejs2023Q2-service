import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll() {
    return await this.albumService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  async get(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.get(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', format: 'uuid' })
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.albumService.delete(id);
  }
}
