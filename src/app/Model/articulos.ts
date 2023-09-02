export class Articulos {
    id?: number;
    nombre: string;
    familia: string;
    stock: number;
    puntorepo: number;
    costo: number;
    precioventa: number;
    stockinicial: number;
    imagen: string;
    cantidad: number;
    checkEdit: string;

    constructor(nombre: string, familia: string,  stock: number, puntorepo: number, costo: number, precioventa: number, stockinicial: number, imagen: string, cantidad: number, checkEdit: string){
        this.nombre = nombre;
        this.familia = familia;
        this.stock = stock;
        this.puntorepo = puntorepo;
        this.costo = costo;
        this.precioventa = precioventa;
        this.stockinicial = stockinicial;
        this.imagen = imagen;
        this.cantidad = cantidad;
        this.checkEdit = checkEdit;
       
    }
}
