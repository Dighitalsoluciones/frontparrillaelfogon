export class Mesas1 {
    id?: number;
    estado: string;
    comanda: string;
    cierre: string;
    liquidada: string;
    imagen: string;
    numeroMesa: string;
    totalComanda: number;
    comensales: number;
    impresion: string;
    
    constructor(estado: string, comanda: string,  cierre: string, liquidada: string, imagen: string, numeroMesa: string, totalComanda: number, comensales: number, impresion: string){
        this.estado = estado;
        this.comanda = comanda;
        this.cierre = cierre;
        this.liquidada = liquidada;
        this.imagen = imagen;
        this.numeroMesa = numeroMesa;
        this.totalComanda = totalComanda;
        this.comensales = comensales;
        this.impresion = impresion;
    }
}
