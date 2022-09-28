export class Articulos {
    id?: number;
    nombre: string;
    familia: string;
    stock: string;
    puntorepo: string;
    costo: string;
    precioventa: string;
    stockinicial: string;

    constructor(nombre: string, familia: string,  stock: string, puntorepo: string, costo: string, precioventa: string, stockinicial: string){
        this.nombre = nombre;
        this.familia = familia;
        this.stock = stock;
        this.puntorepo = puntorepo;
        this.costo = costo;
        this.precioventa = precioventa;
        this.stockinicial = stockinicial;
       
    }
}
