import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.add('artist', id);
    return `Successfully added artist with id ${id} in favorites`;
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.add('track', id);
    return `Successfully added track with id ${id} in favorites`;
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.add('album', id);
    return `Successfully added album with id ${id} in favorites`;
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/track/:id')
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.delete('track', id);
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/album/:id')
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.delete('album', id);
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/artist/:id')
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.delete('artist', id);
  }
}
