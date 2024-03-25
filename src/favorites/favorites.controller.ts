import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.addArtist(id);
    return `Successfully added artist with id ${id} in favorites`;
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.addTrack(id);
    return `Successfully added track with id ${id} in favorites`;
  }

  @HttpCode(201)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.addAlbum(id);
    return `Successfully added album with id ${id} in favorites`;
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.deleteTrack(id);
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.deleteAlbum(id);
  }

  @HttpCode(204)
  @ApiParam({ name: 'id', format: 'uuid' })
  @Delete('/artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.favoritesService.deleteArtist(id);
  }
}
