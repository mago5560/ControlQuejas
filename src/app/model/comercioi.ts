import { EncargadoI } from "./encargadoi";
import { MunicipioI } from "./municipioi";

export interface ComercioI{
    "id":number,
    "nombre": string,
    "encargadoId":number,
    "encargado"?:EncargadoI,
    "municipioId":number,
    "municipio"?:MunicipioI
}