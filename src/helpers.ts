import { v4 as uuid } from 'uuid';

export const generateID = () => uuid();

export const getTimestamp = () => new Date().getTime();
