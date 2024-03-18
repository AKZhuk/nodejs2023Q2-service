import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async get(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async create(dto: CreateAlbumDto) {
    const artist = this.albumRepository.create(dto);
    return await this.albumRepository.save(artist);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException();
    }
    await this.albumRepository.save({
      ...album,
      ...dto,
    });
    return Object.assign(album, dto);
  }
  async delete(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }

    // this.deleteReferences(id);
  }

  // deleteReferences(id: string) {
  //   DB.track.forEach((track) => {
  //     track.albumId = track.albumId === id ? null : track.albumId;
  //   });
  //   DB.favorites.album.delete(id);
  // }
}
