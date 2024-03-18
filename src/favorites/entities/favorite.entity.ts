import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

// @Entity()
// export class FavoriteEntity {
//   @ManyToOne(() => ArtistEntity, null, { onDelete: 'SET NULL', eager: true })
//   @Expose({ name: 'artistId' })
//   @Transform(({ value }) => (value ? value.id : null))
//   artistId: string[];

//   @ManyToOne(() => AlbumEntity, null, { onDelete: 'SET NULL', eager: true })
//   @Expose({ name: 'albumId' })
//   @Transform(({ value }) => (value ? value.id : null))
//   albumId: string[];
// }

@Entity()
export class FavoriteArtist {
  constructor (artist: ArtistEntity) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ArtistEntity, null, { onDelete: 'CASCADE' })
  artist: ArtistEntity;
}

@Entity()
export class FavoriteTrack {
  constructor (track: TrackEntity) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TrackEntity, null, { onDelete: 'CASCADE' })
  track: TrackEntity;
}

@Entity()
export class FavoriteAlbum {
  constructor (album: AlbumEntity) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AlbumEntity, null, { onDelete: 'CASCADE' })
  album: AlbumEntity;
}
