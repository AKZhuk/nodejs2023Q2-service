import { generateID } from './helpers';
import { Album, Artist, Track, User } from './types';

const testUser: User = {
  login: 'AKZhuk',
  password: 'qwerty',
  updatedAt: 122121,
  version: 1,
  createdAt: 2323,
};
export const DB = {
  users: new Map<string, User>([[generateID(), testUser]]),
  artist: new Map<string, Artist>(),
  track: new Map<string, Track>(),
  album: new Map<string, Album>(),
  favorites: {
    artist: new Set<string>([generateID(), generateID()]),
    album: new Set<string>([generateID(), generateID()]),
    track: new Set<string>([generateID(), generateID()]),
  },
};
