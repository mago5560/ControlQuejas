import { ComercioI } from "./comercioi";

export interface SucursalI{
    "id":number,
    "nombre":string,
    "telefono": number,
    "direccion": string,
    "comercioId": number,
    "comercio"?:ComercioI
}