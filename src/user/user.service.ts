import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async get(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user.toResponse();
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return (await this.userRepository.save(user)).toResponse();
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password === dto.oldPassword) {
      await this.userRepository.save({
        ...user,
        password: dto.newPassword,
      });
      return await this.get(id);
    } else {
      throw new HttpException(
        'Forbidden. User password is invalid',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
