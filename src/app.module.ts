import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { EquipoModule } from './equipo/equipo.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { OrdenModule } from './orden/orden.module';
import { TipoEquipoModule } from './tipo_equipo/tipo_equipo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TableViewModule } from './view/tableView.module';
import { NegocioModule } from './negocio/negocio.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:   'bkibcfwjifiehzbn9pwc-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uwoyqjawvug3suax',//'ujhs0fftir2vghah',
      password: 'SAC3PHz5pSPp4g0he88X',//'Wl57GFgpqbLquINI06fr', 
      database: 'bkibcfwjifiehzbn9pwc',//'bwcundda0dgl9otj5tky',
      entities: [__dirname + '/../dist/**/entities/*.entity.{js,ts}', __dirname + '/../dist/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ClienteModule,
    EquipoModule,
    MarcaModule,
    ModeloModule,
    OrdenModule,
    TipoEquipoModule,
    AuthModule,
    UsersModule,
    TableViewModule,
    NegocioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
