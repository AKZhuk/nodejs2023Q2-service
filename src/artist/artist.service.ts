import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async get(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  async create(dto: CreateArtistDto) {
    const artist = this.artistRepository.create(dto);
    return await this.artistRepository.save(artist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException();
    }
    await this.artistRepository.save({
      ...artist,
      ...dto,
    });
    return await this.get(id);
  }

  async delete(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }

    // this.deleteReferences(id);
  }
  // deleteReferences(id: string) {
  //   DB.track.forEach((track) => {
  //     track.artistId = track.artistId === id ? null : track.artistId;
  //   });
  //   DB.album.forEach((album) => {
  //     album.artistId = album.artistId === id ? null : album.artistId;
  //   });

  //   DB.favorites.artist.delete(id);
  // }
}
