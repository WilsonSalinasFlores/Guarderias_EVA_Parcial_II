import { ICuidadores } from "./icuidadores"
import { INinos } from "./ininos"

export interface IAsignaciones {
    asignacionId: number,
    ninoId: number,
    cuidadorId: number,
    fechaAsignacion: Date,
    ninos: INinos [],
    Cuidador: ICuidadores

}
