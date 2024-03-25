import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Entity()
export class FavoriteArtistEntity {
  constructor(artist: ArtistEntity) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @OneToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: ArtistEntity;
}

@Entity()
export class FavoriteTrackEntity {
  constructor(track: TrackEntity) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @OneToOne(() => TrackEntity, (track) => track.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: TrackEntity;
}

@Entity()
export class FavoriteAlbumEntity {
  constructor(album: AlbumEntity) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @OneToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: AlbumEntity;
}
