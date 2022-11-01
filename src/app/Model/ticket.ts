export class Ticket {
    id?: number;
    listadoArticulos: string;
    importe: number;
    observacion: string;
    fecha: string;

    constructor(listadoArticulos: string, importe: number, observacion: string, fecha: string){
        this.listadoArticulos = listadoArticulos;
        this.importe = importe;
        this.observacion = observacion;
        this.fecha = fecha;
    }
}
