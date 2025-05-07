export interface Usuario {
    id: string;
    nombre: string;
    email: string;
  }
  
  export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
  }
  
  export interface Venta {
    id: string;
    usuario_id: string;
    producto_id: string;
    cantidad: number;
    fecha: string;
    total: number;
  }