export class Empleado {
    id?: number;
    codigo: string;
    nombre: string;
    contacto: string;
    editar: boolean;

    constructor(codigo: string, nombre: string, contacto: string, editar: boolean) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.contacto = contacto;
        this.editar = editar;
    }
}
