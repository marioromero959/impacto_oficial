import { Pipe, PipeTransform } from '@angular/core';
import { Productos } from 'src/app/admin/interface/product';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: Productos[], ...args: unknown[]):any{
    const show:Productos[] = []
/*     value.forEach(item =>{
      if(!show.includes(item)){
        show.push(item)
        item.cantidad = 1
      }else{  
        item.cantidad++
      } 
      return show
    }) */
    return show
}
}
