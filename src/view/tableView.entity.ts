import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Equipo } from 'src/equipo/entities/equipo.entity';
import { Orden } from 'src/orden/entities/orden.entity';
import { ViewEntity, ViewColumn, DataSource } from 'typeorm';


@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('orden.id', 'id')
      .addSelect('orden.falla', 'falla')
      .addSelect('orden.estado', 'estado')
      .addSelect('cliente.nombre', 'nombre')
      .addSelect('modelo.nombre', 'modelo')
      .addSelect('marca.nombre', 'marca')
      .addSelect('tipoEquipo.nombre', 'tipoEquipo')
      .from(Orden, 'orden')
      .innerJoin(Cliente, 'cliente', 'cliente.id = orden.id_cliente')
      .innerJoin(Equipo, 'equipo', 'equipo.id = orden.id_equipo')
      .innerJoin('equipo.modelo', 'modelo')
      .innerJoin('modelo.marca', 'marca')
      .innerJoin('modelo.tipoEquipo', 'tipoEquipo'),
})
export class TableView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  falla: string;

  @ViewColumn()
  nombre: string;
  @ViewColumn()
  modelo: string;
  @ViewColumn()
  marca: string;
  @ViewColumn()
  estado: number;
}
