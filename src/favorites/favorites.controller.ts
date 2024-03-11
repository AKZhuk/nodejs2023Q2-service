import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesKey } from 'src/types';
import { ApiParam } from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @HttpCode(201)
  @ApiParam({ enum: ['artist', 'album', 'track'], name: 'type' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post(':type/:id')
  async add(
    @Param('type') type: FavoritesKey,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    Logger.warn('collection', type, id);
    this.favoritesService.add(type, id);
    return `Successfully added ${type} with id ${id} in favorites`;
  }

  @HttpCode(204)
  @ApiParam({ enum: ['artist', 'album', 'track'], name: 'type' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete(':type/:id')
  delete(
    @Param('type') type: FavoritesKey,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    this.favoritesService.delete(type, id);
  }
}
