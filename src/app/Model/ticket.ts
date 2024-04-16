export class Ticket {
    id?: number;
    listadoArticulos: string;
    importe: number;
    observacion: string;
    fecha: string;
    numerodeMesa: string;
    formadepago: string;
    check: string;
    mesero: string;

    constructor(listadoArticulos: string, importe: number, observacion: string, fecha: string,
        numerodeMesa: string, formadepago: string, check: string, mesero: string) {
        this.listadoArticulos = listadoArticulos;
        this.importe = importe;
        this.observacion = observacion;
        this.fecha = fecha;
        this.numerodeMesa = numerodeMesa;
        this.formadepago = formadepago;
        this.check = check;
        this.mesero = mesero;
    }
}
