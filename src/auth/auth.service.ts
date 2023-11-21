import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from 'src/users/dto/changePassword.dto';
import { NewPasswordDto } from 'src/users/dto/newPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  // METODO REGISTRAR NUEVO USUARIO
  async register({ name, username, password }: RegisterDto) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }
    let userCreate = await this.usersService.create({ name, username, password: await bcrypt.hash(password, 10) });
    if (!userCreate) {
      throw new Error('No se pudo guardar el usuario')
    }
    return true
  };

  // METODO LOGUEO
  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password incorrecto');
    }
    const payload = { username: user.username, role: user.role.toLowerCase() };
    const access_token = await this.jwtService.signAsync(payload);
    const name = user.name
    const role = user.role
    return { access_token, username, name, role };
  };

  // METODO RETORNA TODOS LOS USUARIOS (Sin contraseña)
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users
  }

  // METODO RETORNA LOS DATOS DE UN USUARIO
  async getUserData(username) {
    const user = await this.usersService.findOneByUsername(username);
    return user
  }


  // METODO CAMBIAR PASSWORD
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findByUsernameWithPassword(changePasswordDto.username);
    const isPasswordValid = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password actual incorrecto');
    }
    const isSamePassword = await bcrypt.compare(changePasswordDto.newPassword, user.password);
    if (isSamePassword) {
      throw new UnauthorizedException('El password nuevo coincide con el actual');
    }
    let newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10)
    user.password = newPasswordHash
    let change = await this.usersService.save(user)
    if (!change) {
      throw new Error("No se pudo guardar la contraseña")
    }
    return true
  }

  // METODO RESETEAR PASSWORD (SOLO ADMIN)
  async resetPassword(newPasswordDto: NewPasswordDto) {
    const user = await this.usersService.findByUsernameWithPassword(newPasswordDto.username);
    let newPasswordHash = await bcrypt.hash(newPasswordDto.newPassword, 10)
    user.password = newPasswordHash
    let change = await this.usersService.save(user)
    if (!change) {
      throw new Error("No se pudo guardar la contraseña")
    }
    return true
  }

  // METODO ELIMINAR USUARIO
  async deleteUser(username:string) {
    let userDelete = await this.usersService.delete(username);

    if (!userDelete) {
      throw new Error("No se pudo guardar la contraseña")
    }
    return true
  }

  // METODO RESTAURAR USUARIO
  async restoreUser(username:string) {
    let userDelete = await this.usersService.restore(username);

    if (!userDelete) {
      throw new Error("No se pudo guardar la contraseña")
    }
    return true
  }
}
