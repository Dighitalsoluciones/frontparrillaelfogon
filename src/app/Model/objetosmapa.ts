export class Objetosmapa {

    id?: number;
    imagen: string;
    x: number;
    y: number;
    rotacion: number;
    ancho: number;
    largo: number;
    texto: string;
    colorText: string;

    constructor(imagen: string, x: number, y: number, rotacion: number, ancho: number, largo: number,
        texto: string, colorText: string) {
        this.imagen = imagen;
        this.x = x;
        this.y = y;
        this.rotacion = rotacion;
        this.ancho = ancho;
        this.largo = largo;
        this.texto = texto;
        this.colorText = colorText;
    }
}
