import { RegionI } from "./regioni";

export interface DepartamentoI{
    "id": number,
    "nombre": string,
    "regionId": number ,
    "region"?:RegionI 
}