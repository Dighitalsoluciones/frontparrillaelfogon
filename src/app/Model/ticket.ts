export class Ticket {
    id?: number;
    listadoArticulos: string;
    importe: number;
    observacion: string;
    fecha: number;

    constructor(listadoArticulos: string, importe: number, observacion: string, fecha: number){
        this.listadoArticulos = listadoArticulos;
        this.importe = importe;
        this.observacion = observacion;
        this.fecha = fecha;
    }
}
