export class Empleado {
    id?: number;
    codigo: string;
    nombre: string;

    constructor(codigo: string, nombre: string) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
}
