import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumModule } from './album/album.module';
import { USerModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    USerModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    AlbumModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
