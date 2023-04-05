export interface Pedido {
    contrato: string;
    origen:   Origen;
    destino:  Origen;
    remitente:  Remitente;
    destinatario:  Remitente[];
    bultos:  Bultos[];
  }
  
  export interface Origen {
    postal: Postal;
  }
  
  export interface Postal {
    codigoPostal:           string;
    localidad:              string;
    calle:                  string;
    numero:                 string;
    region?:                 string;
    pais?:                   string;
    componentesDeDireccion?: ComponentesDeDireccion;
  }
  
  export interface ComponentesDeDireccion {
    meta:      string;
    contenido: string;
  }
  
  export interface Remitente {
  nombreCompleto:  string;
  email:           string;
  documentoTipo:   string;
  documentoNumero: string;
  telefonos?:       Telefono[];
  }
  
  export interface Telefono {
  tipo:   string;
  numero: string;
  }
  export interface Bultos {
    kilos:                      string;
    largoCm?:                    string;
    altoCm?:                     string;
    anchoCm?:                    string;
    volumenCm:                  string;
    valorDeclaradoSinImpuestos?: string;
    valorDeclaradoConImpuestos?: string;
    referencias?:                Referencia[];
  }
  
  export interface Referencia {
    meta:      string;
    contenido: string;
  }