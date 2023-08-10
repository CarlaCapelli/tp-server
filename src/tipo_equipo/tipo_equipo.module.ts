import { Module } from '@nestjs/common';
import { TipoEquipoService } from './tipo_equipo.service';
import { TipoEquipoController } from './tipo_equipo.controller';

@Module({
  controllers: [TipoEquipoController],
  providers: [TipoEquipoService]
})
export class TipoEquipoModule {}
