import { Cliente } from "src/cliente/entities/cliente.entity"
import { Equipo } from "src/equipo/entities/equipo.entity"
import { Orden } from "src/orden/entities/orden.entity"
import { ViewEntity, ViewColumn, DataSource } from "typeorm"

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select("orden.id", "id")
            .addSelect("orden.falla", "falla")
            .addSelect("cliente.nombre", "nombre")
            .from(Orden, "orden")
            .leftJoin(Cliente, "cliente", "cliente.id = orden.id_cliente")
         
})
export class TableView {
    @ViewColumn()
    id: number

    @ViewColumn()
    falla: string

    @ViewColumn()
    nombre: string
}