import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findByUsernameWithPassword(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'name', 'username', 'password', 'role'],
    });
  }

  async save(user: User) {
    let save = await this.userRepository.save(user)

    if (!save) {
      throw new Error('No se pudo guardar usuario')
    }

    return true
  }

  async findOne(id: number): Promise<User> {
    let criterio: FindOneOptions = { where: { id: id } }
    let usuario = await this.userRepository.findOne(criterio)
    if (usuario) {
      return usuario
    }
  }

  async changeRole(changeRoleDto: ChangeRoleDto): Promise<Boolean> {
    let usuario: User = await this.findOne(changeRoleDto.idUser)

    if (usuario) {
      usuario.changeRole(changeRoleDto.newRole)

      this.userRepository.save(usuario)
      return true
    }
    return false
  }

  async updateUser(userDto: PartialUpdateUserDto) {
    try {
      let criterio: FindOneOptions = { where: { id: userDto.id } };
      let user: User = await this.userRepository.findOne(criterio);
      if (!user) {
        throw new Error('No se encontró usuario')
      };

      if (userDto.username != user.username && this.findOneByUsername(userDto.username)) {
        throw new Error('Ya existe un usuario con el mismo username')
      }

      Object.assign(user, userDto);
      let userSave = await this.userRepository.save(user);

      if (userSave) {
        return true;
      }

      return false
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `${error}` },
        HttpStatus.NOT_FOUND)
    }

  }
}
