import { DepartamentoI } from "./departamentoi";

export interface MunicipioI{
    "id": number,
    "nombre": string,
    "departamentoId": number,
    "departamento"?:DepartamentoI
}