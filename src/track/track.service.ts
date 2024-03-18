import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async get(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async create(dto: CreateTrackDto) {
    const track = this.trackRepository.create(dto);
    return await this.trackRepository.save(track);
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException();
    }
    await this.trackRepository.save({
      ...track,
      ...dto,
    });
    return await this.get(id);
  }
  async delete(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }

    // this.deleteReferences(id);
  }

  // deleteReferences(id: string) {
  //   DB.favorites.track.delete(id);
  // }
}
