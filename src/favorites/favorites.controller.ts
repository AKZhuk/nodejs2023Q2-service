import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesKey } from 'src/types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @HttpCode(201)
  @Post(':type/:id')
  async add(@Param('type') type: FavoritesKey, @Param('id') id: string) {
    Logger.warn('collection', type, id);
    this.favoritesService.add(type, id);
    return `Successfully added ${type} with id ${id} in favorites`;
  }

  @HttpCode(204)
  @Delete(':type/:id')
  delete(@Param('type') type: FavoritesKey, @Param('id') id: string) {
    this.favoritesService.delete(type, id);
  }
}
