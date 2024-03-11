import { Injectable } from '@nestjs/common';
import { DB } from 'src/db';
import { generateID, throwNotFoundError, validateUUID } from 'src/helpers';
import { Album, WithId } from 'src/types';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  getAll(): WithId<Album>[] {
    return Array.from(DB.album.entries()).map(([id, album]) => {
      return { id, ...album };
    });
  }

  get(id: string): WithId<Album> {
    validateUUID(id);
    const album = DB.album.get(id);
    if (!album) {
      throwNotFoundError('album');
    }

    return { ...album, id };
  }

  create(dto: CreateAlbumDto) {
    const id = generateID();
    DB.album.set(id, dto);

    return { id, ...dto };
  }

  update(id: string, dto: Album) {
    validateUUID(id);
    const album = DB.album.get(id);
    if (!album) {
      throwNotFoundError('album');
    }
    DB.album.set(id, { ...album, ...dto });
    return { id, ...DB.album.get(id) };
  }

  delete(id: string) {
    validateUUID(id);
    const album = DB.album.delete(id);
    if (!album) {
      throwNotFoundError('album');
    }
    this.deleteReferences(id);
  }
  deleteReferences(id: string) {
    DB.track.forEach((track) => {
      track.albumId = track.albumId === id ? null : track.albumId;
    });
    DB.favorites.album.delete(id);
  }
}
