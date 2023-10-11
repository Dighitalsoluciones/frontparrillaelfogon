export class Egresos {
    id?: number;
    fecha: string;
    importe: number;
    tipodegasto: string;
    realizadopor: string;
    observacion: string;
    mostrar: string;
    checkEd: string;

    constructor(fecha: string, importe: number, tipodegasto: string, realizadopor: string, observacion: string, mostrar: string, checkEd: string){
        this.fecha = fecha;
        this.importe = importe;
        this.tipodegasto = tipodegasto;
        this.realizadopor = realizadopor;
        this. observacion = observacion;
        this.mostrar = mostrar;
        this.checkEd = checkEd;
    }


}
