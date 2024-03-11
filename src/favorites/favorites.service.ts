import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DB } from 'src/db';
import { FavoritesKey } from 'src/types';

@Injectable()
export class FavoritesService {
  getFavoritesByIds(name: string, IDsSet: Set<string>) {
    return Array.from(IDsSet).map((id) => ({ id, ...DB[name].get(id) }));
  }

  getAll() {
    DB.favorites;

    const response = {
      artists: this.getFavoritesByIds('artist', DB.favorites.artist),
      albums: this.getFavoritesByIds('album', DB.favorites.album),
      tracks: this.getFavoritesByIds('track', DB.favorites.track),
    };
    return response;
  }

  add(type: FavoritesKey, id: string) {
    if (!DB[type].has(id)) {
      throw new HttpException(
        `${type} with id ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    DB.favorites[type].add(id);
  }

  delete(type: FavoritesKey, id: string) {
    const favorite = DB.favorites[type].delete(id);
    if (!favorite) {
      throw new NotFoundException();
    }
  }
}
