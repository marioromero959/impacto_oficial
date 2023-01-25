export interface Producto {
    _id:         string;
    nombre:      string;
    usuario:     Categoria;
    precio:      number;
    categoria:   Categoria;
    descripcion: string;
    disponible:  boolean;
    img:         string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}
