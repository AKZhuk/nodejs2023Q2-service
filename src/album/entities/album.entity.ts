import { Transform } from 'class-transformer';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  year: number;

  @ManyToOne(() => ArtistEntity, null, { onDelete: 'SET NULL', eager: true })
  @Transform(({ value }) => (value ? value.id : null))
  artistId: string | null; // refers to Artist
}
