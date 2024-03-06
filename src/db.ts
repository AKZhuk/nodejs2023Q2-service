import { generateID } from "./helpers";
import { Album, Artist, Favorites, Track, User } from "./types";

const tUser: User = { 'login': 'AKZhuk', 'password': 'qwerty', 'updatedAt': 122121, 'version': 1, 'createdAt': 2323 }
export const DB = {
  users: new Map<string, User>([[generateID(), tUser]]),
  artist: new Map<string, Artist>(),
  track: new Map<string, Track>(),
  album: new Map<string, Album>(),
  favorites: new Map<string, Favorites>()
}
