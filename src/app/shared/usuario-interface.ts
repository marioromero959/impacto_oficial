export interface Usuarios {
    total:    number;
    usuarios: Usuario[];
}

export interface Usuario {
    nombre: string;
    correo: string;
    rol:    string;
    estado: boolean;
    google: boolean;
    uid:    string;
}
