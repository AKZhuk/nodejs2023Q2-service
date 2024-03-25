import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { USerModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { AlbumEntity } from './album/entities/album.entity';
import { TrackEntity } from './track/entities/track.entity';
import {
  FavoriteAlbumEntity,
  FavoriteArtistEntity,
  FavoriteTrackEntity,
} from './favorites/entities/favorite.entity';

@Module({
  imports: [
    USerModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    AlbumModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserEntity,
        ArtistEntity,
        AlbumEntity,
        TrackEntity,
        FavoriteAlbumEntity,
        FavoriteArtistEntity,
        FavoriteTrackEntity,
      ],
      // migrationsTableName: 'migration',
      // migrations: [
      //   __dirname + '/migration/**/*.ts',
      //   __dirname + '/migration/**/*.js',
      // ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
