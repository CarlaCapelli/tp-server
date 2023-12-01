import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { Role } from 'src/common/enum/rol.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  // CREAR USUARIO
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // DEVOLVER TODOS LOS USUARIOS
  findAll() {
    return this.userRepository.find();
  }

  // ENCONTRAR UN USUARIO POR USERNAME
  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  // ENCONTRAR UN USUARIO POR USERNAME Y CONTRASEÑA
  findByUsernameWithPassword(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'name', 'username', 'password', 'role'],
    });
  }

  // GUARDAR UN NUEVO USUARIO
  async save(user: User) {
    let save = await this.userRepository.save(user)

    if (!save) {
      throw new Error('No se pudo guardar usuario')
    }

    return true
  }


  /// ELIMINAR USUARIO
  async delete(username: string) {
    let user = await this.userRepository.findOneBy({ username });
    let lastAdmin = this.checkLastAdmin()

    if (!user) {
      throw new Error('No se encontró usuario')
    }

    if (lastAdmin && user.role == Role.ADMIN){
      throw new Error('Unico usuario administrador')
    }

    // let userDelete = await user.softDelete()
    let criterioDelete : FindOptionsWhere<User> = { username:user.username }

    let userDelete = await this.userRepository.delete(criterioDelete)

    if (!userDelete) {
      throw new Error('No se pudo eliminar usuario')
    }

    return true
  }

  /// RESTAURAR USUARIO
  async restore(username: string) {
    let user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new Error('No se encontró usuario')
    }

    let userDelete = await user.restore()

    if (!userDelete) {
      throw new Error('No se pudo eliminar usuario')
    }

    return true
  }

  // ACTUALIZAR INFORMACION DE USUARIO POR ID
  async updateUser(userDto: PartialUpdateUserDto) {
    try {
      // Si no encuentra el usuario
      let criterio: FindOneOptions = { where: { id: userDto.id } };
      let user: User = await this.userRepository.findOne(criterio);
      if (!user) {
        throw new Error('No se encontró usuario')
      };

      // Si el username se cambio y está en uso
      let usernameUsed = await this.findOneByUsername(userDto.username)
      if (userDto.username !== user.username && usernameUsed != null) {
        throw new Error('Username en uso')
      }

      // Si es el ultimo administrador
      let lastAdmin = this.checkLastAdmin()
      if (lastAdmin && userDto.role == Role.USER){
        throw new Error('Unico usuario administrador')
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

  // COMPROBAR SI QUEDA UN SOLO USUARIO ADMINISTRADOR

  private async checkLastAdmin(){
    let usersAdmin = (await this.userRepository.findBy({ role: Role.ADMIN })).length;

    if (!usersAdmin || usersAdmin <= 1 ) {
      return true
    };

    return false
  }
}
