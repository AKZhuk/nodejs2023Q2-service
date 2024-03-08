import { Injectable } from '@nestjs/common';
import { DB } from 'src/db';
import { generateID, throwNotFoundError, validateUUID } from 'src/helpers';
import { Track } from 'src/types';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  getAll() {
    return Array.from(DB.track.entries()).map(([id, track]) => {
      return { id, ...track };
    });
  }

  get(id: string) {
    validateUUID(id);
    const track = DB.track.get(id);
    if (!track) {
      throwNotFoundError('track');
    }

    return { ...track, id };
  }

  create(dto: CreateTrackDto) {
    const id = generateID();
    DB.track.set(id, dto);

    return { id, ...dto };
  }

  update(id: string, dto: Track) {
    validateUUID(id);
    const track = DB.track.get(id);
    if (!track) {
      throwNotFoundError('track');
    }
    DB.track.set(id, { ...track, ...dto });

    return { id, ...DB.track.get(id) };
  }

  delete(id: string) {
    validateUUID(id);
    const track = DB.track.delete(id);
    if (!track) {
      throwNotFoundError('track');
    }
    this.deleteReferences(id);
  }
  deleteReferences(id: string) {
    DB.favorites.track.delete(id);
  }
}
