import { SucursalI } from "./sucursali";

export interface QuejaI{
    "id":number,
    "fecha": string,
    "hora": string,
    "observaciones":string,
    "sucursalId":number,
    "comercioId":number,
    "municipioId":number,
    "departamentoId":number,
    "regionId":number,
    "sucursal"?:SucursalI,

}