export class MovimientoStock {
    id?: number;
    listadoItem: string;
    fecha: Date;
    observacion: string;

    constructor(listadoItem: string, fecha: Date, observacion: string) {
        this.listadoItem = listadoItem;
        this.fecha = fecha;
        this.observacion = observacion;
    }
}
