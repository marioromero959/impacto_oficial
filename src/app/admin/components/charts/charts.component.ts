import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  single: any[];
  view:[number, number] = [200, 200];
  colorScheme = { domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']};
  value: number = 0;
  units: string = 'Productos Vendidos';
  soldProducts = []

  constructor(
    private adminSvc:AdminService
  ) { }

  ngOnInit(): void {
    this.obtenerDatosCompra()
  }


  onSelect(event) {
    console.log(event);
  }

  obtenerDatosCompra(){
    this.adminSvc.obtenerDatosCompra().pipe
    (map((data:any) => data.results))
    // filter(item => item == "MERCPAGO*VELKAHANDMADE")
    .subscribe((items:any) =>{
      // console.log("items",items.map(i=>{
      // return {'data':i.metadata,'info':i.metadata}
      // }));
      this.soldProducts = items.filter(item => item.statement_descriptor === "MERCPAGO*VELKAHANDMADE")
                               .map(item =>item.additional_info.items).filter(element=>element !== undefined);
      
      this.imprimirArr()
    })
  }

  imprimirArr():any[]{
    let union_array = [];
    union_array =  [].concat.apply([], this.soldProducts);
    return union_array 
  }

  totalPrecio(){
    let total = 0
    this.imprimirArr().forEach(producto => {
      total += Number(producto.unit_price)
    });
    return total
  }
  
  totalCantidad(){
    let total = 0
    this.imprimirArr().forEach(producto => {
      total += Number(producto.quantity)
    });
    return total
  }

}
