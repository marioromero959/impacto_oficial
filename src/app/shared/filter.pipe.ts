import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, busqueda:any,paginacion:number = 0): any {
    if(busqueda === ''){
      return value
    }else{
      const filtrados = [];
      for(const filtrado of value){
        if(filtrado.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) > -1){
          filtrados.push(filtrado)
        }
      }
      return filtrados;
    }
    
  } 
}
