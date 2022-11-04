export class Ticket {
    id?: number;
    listadoArticulos: string;
    importe: number;
    observacion: string;
    fecha: string;
    numerodeMesa: string;

    constructor(listadoArticulos: string, importe: number, observacion: string, fecha: string, numerodeMesa: string){
        this.listadoArticulos = listadoArticulos;
        this.importe = importe;
        this.observacion = observacion;
        this.fecha = fecha;
        this.numerodeMesa = numerodeMesa;
    }
}
