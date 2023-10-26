import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  single: any[];
  view: [number, number] = [200, 200];
  colorScheme = { domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'] };
  value: number = 0;
  units: string = 'Productos Vendidos';
  soldProducts = []

  constructor(
    private adminSvc: AdminService
  ) { }

  ngOnInit(): void {
    this.obtenerCompra()
  }


  onSelect(event) {
    console.log(event);
  }

  obtenerCompra() {
    this.adminSvc.obtenerDatosCompra().subscribe(res => {
      console.log('res', res);
    })
  }

  obtenerDatosCompra() {
    this.adminSvc.obtenerDatosCompra().pipe
      (map((data: any) => data.results))
      .subscribe((items: any) => {
        this.soldProducts = items
        console.log("sp",this.soldProducts);
        this.imprimirArr()
      })
  }

  imprimirArr(): any[] {
    let union_array = [];
    union_array = [].concat.apply([], this.soldProducts);
    return union_array
  }

  totalPrecio() {
    let total = 0
    this.imprimirArr().forEach(producto => {
      total += Number(producto.unit_price)
    });
    return total
  }

  totalCantidad() {
    let total = 0
    this.imprimirArr().forEach(producto => {
      total += Number(producto.quantity)
    });
    return total
  }

}
