export class Empleado {
    id?: number;
    codigo: string;
    nombre: string;
    contacto: string;
    editar: string;

    constructor(codigo: string, nombre: string, contacto: string, editar: string) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.contacto = contacto;
        this.editar = editar;
    }
}
