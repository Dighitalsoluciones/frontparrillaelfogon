export class Mesas1 {
    id?: number;
    estado: string;
    comanda: string;
    cierre: boolean;
    liquidada: boolean;
    imagen: string;
    numeroMesa: string;
    
    constructor(estado: string, comanda: string,  cierre: boolean, liquidada: boolean, imagen: string, numeroMesa: string){
        this.estado = estado;
        this.comanda = comanda;
        this.cierre = cierre;
        this.liquidada = liquidada;
        this.imagen = imagen;
        this.numeroMesa = numeroMesa;
    }
}
