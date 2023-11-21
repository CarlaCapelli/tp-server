import { AuthService } from './auth.service';
import { Body, Controller, Delete, Param, Patch, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/common/enum/rol.enum';
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

  // RESETEO DE PASSWORD (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('resetpassword')
  newPass(@Req() res, @Body() newPasswordDto: NewPasswordDto) {
    return this.authService.resetPassword(newPasswordDto)
  }

  // OBTENER INFORMACION DE TODOS LOS USUARIOS: USERNAME, NAME, ROLE (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('users')
  getAll() {
    return this.authService.getAllUsers();
  }

  // ELIMINAR USUARIO (SOLO ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('user/:username')
  deleteUser(@Param('username') username: string) {
    return this.authService.deleteUser(username);
  }
}
