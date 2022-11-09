export class Recibos {
    id?: number;
    fecha: string;
    corresTicket: number;
    importe: number;
    observacion: string;
    numerodeMesa: string;
    formadepago: string;

    constructor(fecha: string, corresTicket: number, importe: number, observacion: string, numerodeMesa: string, formadepago: string){
        this.fecha = fecha;
        this.corresTicket = corresTicket;
        this.importe = importe;
        this.observacion = observacion;
        this.numerodeMesa = numerodeMesa;
        this.formadepago = formadepago;
    }
}
