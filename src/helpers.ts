import { HttpException, HttpStatus } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { v4 as uuid } from 'uuid';

export const generateID = () => uuid()
export const getTimestamp = () => new Date().getTime()
export const validateUUID = (id: string) => {
  if (!isUUID(id)) {
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
  }
}
export const throwNotFoundError = (entity: string) => {
  throw new HttpException(`${entity} not found`, HttpStatus.NOT_FOUND);
}
