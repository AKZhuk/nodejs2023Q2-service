import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { TrackService } from './track/track.service';
import { TrackModule } from './track/track.module';
import { AlbumController } from './album/album.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumService } from './album/album.service';
import { AlbumModule } from './album/album.module';
import { ArtistService } from './artist/artist.service';
import { FavoritesService } from './favorites/favorites.service';
import { TrackController } from './track/track.controller';
import { USerModule } from './user/user.module';

@Module({
  imports: [USerModule, ArtistModule, TrackModule, FavoritesModule, AlbumModule],
})
export class AppModule {}
