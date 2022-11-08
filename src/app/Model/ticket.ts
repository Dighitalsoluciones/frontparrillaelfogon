export class Ticket {
    id?: number;
    listadoArticulos: string;
    importe: number;
    observacion: string;
    fecha: string;
    numerodeMesa: string;
    formadepago: string;

    constructor(listadoArticulos: string, importe: number, observacion: string, fecha: string, numerodeMesa: string, formadepago: string){
        this.listadoArticulos = listadoArticulos;
        this.importe = importe;
        this.observacion = observacion;
        this.fecha = fecha;
        this.numerodeMesa = numerodeMesa;
        this.formadepago = formadepago;
    }
}
