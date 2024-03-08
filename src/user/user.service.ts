import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DB } from 'src/db';
import { CreateUserDto } from './dto/create-user.dto';
import {
  generateID,
  getTimestamp,
  throwNotFoundError,
  validateUUID,
} from 'src/helpers';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  getAll() {
    return Array.from(DB.users.entries()).map(([id, user]) => {
      const { password, ...userWithoutPassword } = user;
      console.log('ssds', id, user);

      return { id, ...userWithoutPassword };
    });
  }

  get(id: string) {
    validateUUID(id);
    const user = DB.users.get(id);
    if (!user) {
      throwNotFoundError('user');
    }
    const { password, ...rest } = user;
    return { id, ...rest };
  }

  create(dto: CreateUserDto) {
    const id = generateID();
    const timeStamp = getTimestamp();
    DB.users.set(id, {
      ...dto,
      createdAt: timeStamp,
      updatedAt: timeStamp,
      version: 1,
    });
    const { password, ...user } = DB.users.get(id);
    return { id, ...user };
  }

  update(id: string, dto: UpdatePasswordDto) {
    validateUUID(id);
    const user = DB.users.get(id);
    if (!user) {
      throwNotFoundError('user');
    }
    if (user.password === dto.oldPassword) {
      DB.users.set(id, {
        ...user,
        password: dto.newPassword,
        version: user.version + 1,
        updatedAt: getTimestamp(),
      });
      const { password, ...rest } = DB.users.get(id);
      return { id, ...rest };
    } else {
      throw new HttpException(
        'Forbidden. User password is invalid',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  delete(id: string) {
    validateUUID(id);
    const user = DB.users.delete(id);
    if (!user) {
      throwNotFoundError('user');
    }
  }
}
