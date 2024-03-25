import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
} from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteAlbumEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumEntity>,
    @InjectRepository(FavoriteArtistEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistEntity>,
    @InjectRepository(FavoriteTrackEntity)
    private favoriteTrackRepository: Repository<FavoriteTrackEntity>,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async checkIsAlreadyInFavorites(
    db:
      | Repository<FavoriteTrackEntity>
      | Repository<FavoriteAlbumEntity>
      | Repository<FavoriteArtistEntity>,
    propName: string,
    id: string,
  ) {
    const favItem = await db.exists({
      where: { [propName]: id },
    });

    if (favItem) {
      throw new UnprocessableEntityException(
        `This item was added to favorites earlier!`,
      );
    }
  }

  async getAll() {
    const [favAlbums, favArtists, favTracks] = await Promise.all([
      this.favoriteAlbumRepository.find({
        relations: ['album'],
      }),
      this.favoriteArtistRepository.find({
        relations: ['artist'],
      }),
      this.favoriteTrackRepository.find({ relations: ['track'] }),
    ]);
    console.log('favAlbums, favArtists, favTracks', [
      favAlbums,
      favArtists,
      favTracks,
    ]);

    return {
      artists: favArtists.map((artist) => artist.artist),
      albums: favAlbums.map((album) => album.album),
      tracks: favTracks.map((track) => track.track),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) throw new UnprocessableEntityException();
    await this.checkIsAlreadyInFavorites(
      this.favoriteTrackRepository,
      'trackId',
      id,
    );

    return await this.favoriteTrackRepository.save(
      new FavoriteTrackEntity(track),
    );
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) throw new UnprocessableEntityException();
    await this.checkIsAlreadyInFavorites(
      this.favoriteAlbumRepository,
      'albumId',
      id,
    );

    return await this.favoriteAlbumRepository.save(
      new FavoriteAlbumEntity(album),
    );
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) throw new UnprocessableEntityException();
    await this.checkIsAlreadyInFavorites(
      this.favoriteArtistRepository,
      'artistId',
      id,
    );

    return await this.favoriteArtistRepository.save(
      new FavoriteArtistEntity(artist),
    );
  }

  async deleteArtist(id: string) {
    const result = await this.favoriteArtistRepository.delete({
      artist: { id },
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async deleteAlbum(id: string) {
    const result = await this.favoriteAlbumRepository.delete({ album: { id } });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async deleteTrack(id: string) {
    const result = await this.favoriteTrackRepository.delete({ track: { id } });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
