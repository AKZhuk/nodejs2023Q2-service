import { Injectable } from '@nestjs/common';
import { DB } from 'src/db';
import { generateID, throwNotFoundError, validateUUID } from 'src/helpers';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist, WithId } from 'src/types';

@Injectable()
export class ArtistService {
  getAll(): WithId<Artist>[] {
    return Array.from(DB.artist.entries()).map(([id, artist]) => {
      return { id, ...artist };
    });
  }

  get(id: string): WithId<Artist> {
    validateUUID(id);
    const artist = DB.artist.get(id);
    if (!artist) {
      throwNotFoundError('artist');
    }

    return { ...artist, id };
  }

  create(dto: CreateArtistDto) {
    const id = generateID();
    DB.artist.set(id, dto);

    return { id, ...dto };
  }

  update(id: string, dto: Artist) {
    validateUUID(id);
    const artist = DB.artist.get(id);
    if (!artist) {
      throwNotFoundError('artist');
    }
    DB.artist.set(id, { ...artist, ...dto });
    const updatedArtist = DB.artist.get(id);
    return { id, ...updatedArtist };
  }

  delete(id: string) {
    validateUUID(id);
    const artist = DB.artist.delete(id);
    if (!artist) {
      throwNotFoundError('artist');
    }
    this.deleteReferences(id);
  }
  deleteReferences(id: string) {
    DB.track.forEach((track) => {
      track.artistId = track.artistId === id ? null : track.artistId;
    });
    DB.album.forEach((album) => {
      album.artistId = album.artistId === id ? null : album.artistId;
    });

    DB.favorites.artist.delete(id);
  }
}
