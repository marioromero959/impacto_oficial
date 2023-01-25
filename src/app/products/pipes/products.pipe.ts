import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsFiltro'
})
export class ProductsPipe implements PipeTransform {

  transform(value: any, busqueda:string){
    const productosFiltrados = [];
    if (busqueda === null || busqueda === 'All'){
      return value;
    }
    for(const producto of value){
      if(producto.categoria.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) > -1){
        productosFiltrados.push(producto)
      }
    }
    if(productosFiltrados.length == 0)
    return [{nombre:"De momento no tenemos estos productos en stock, podes revisar otras secciones mientras tanto"}];
    
    return productosFiltrados;
  }

}
