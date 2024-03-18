export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesDB {
  artist: Set<string>;
  album: Set<string>;
  track: Set<string>;
}

export type FavoritesKey = keyof FavoritesDB;
