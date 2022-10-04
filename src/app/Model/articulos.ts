export class Articulos {
    id?: number;
    nombre: string;
    familia: string;
    stock: string;
    puntorepo: string;
    costo: string;
    precioventa: string;
    stockinicial: string;
    imagen: string;

    constructor(nombre: string, familia: string,  stock: string, puntorepo: string, costo: string, precioventa: string, stockinicial: string, imagen: string){
        this.nombre = nombre;
        this.familia = familia;
        this.stock = stock;
        this.puntorepo = puntorepo;
        this.costo = costo;
        this.precioventa = precioventa;
        this.stockinicial = stockinicial;
        this.imagen = imagen;
       
    }
}
