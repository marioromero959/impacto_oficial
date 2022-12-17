import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsFiltro'
})
export class ProductsPipe implements PipeTransform {

  transform(value: any, busqueda:string){
    const productosFiltrados = [];
    if (busqueda === null || busqueda === 'all'){
      return value;
    }
    for(const producto of value){
      if(producto.categoria.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) > -1){
        productosFiltrados.push(producto)
      }
    }
    return productosFiltrados;
  }

}
