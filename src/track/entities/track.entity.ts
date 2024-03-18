import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null; // refers to Artist

  @ManyToOne(() => AlbumEntity, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
