import { AuthService } from './auth.service';
import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/common/enum/rol.enum';
import { ChangeRoleDto } from 'src/users/dto/changeRole.dto';
import { UsersService } from 'src/users/users.service';
import { PartialUpdateUserDto } from 'src/users/dto/partial-update-user.dto';
import { ChangePasswordDto } from 'src/users/dto/changePassword.dto';
import { NewPasswordDto } from 'src/users/dto/newPassword.dto';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './role/role.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService,

    private readonly usersService: UsersService) {
  }

  // REGISTRO DE NUEVO USUARIO
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // LOGIN DE USUARIO
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // OBTENER INFORMACION DE USUARIO: USERNAME, NAME, ROLE
  @UseGuards(AuthGuard)
  @Get('user/:username')
  getUserData(@Param('username') username: string) {
    return this.authService.getUserData(username);
  }

  // CAMBIO DE PASSWORD
  @UseGuards(AuthGuard)
  @Patch('password')
  changePass(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto)
  }

  // UPDATE DE USUARIO: USERNAME, NAME, ROLE (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('user')
  updateUser(@Body() updateUserDto: PartialUpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  // CAMBIO DE ROL (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('role')
  changeRol(@Body() changeRoleDto: ChangeRoleDto) {
    return this.authService.changeRole(changeRoleDto)
  }

  // RESETEO DE PASSWORD (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('resetpassword')
  newPass(@Req() res, @Body() newPasswordDto: NewPasswordDto) {
    if (res.user.role != Role.ADMIN) {
      return ('No tiene permisos suficientes para acceder a esta funcion')
    }
    return this.authService.resetPassword(newPasswordDto)
  }

  // OBTENER INFORMACION DE TODOS LOS USUARIOS: USERNAME, NAME, ROLE (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('users')
  getAll() {
    return this.authService.getAllUsers();
  }
}
