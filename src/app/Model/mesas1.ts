export class Mesas1 {
    id?: number;
    estado: string;
    comanda: string;
    cierre: string;
    liquidada: string;
    imagen: string;
    numeroMesa: string;
    totalComanda: number;
    
    constructor(estado: string, comanda: string,  cierre: string, liquidada: string, imagen: string, numeroMesa: string, totalComanda: number){
        this.estado = estado;
        this.comanda = comanda;
        this.cierre = cierre;
        this.liquidada = liquidada;
        this.imagen = imagen;
        this.numeroMesa = numeroMesa;
        this.totalComanda = totalComanda;
    }
}
