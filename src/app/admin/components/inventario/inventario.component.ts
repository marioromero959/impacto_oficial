import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/products/services/products.service';
import { Productos } from '../../interface/product';
import { AdminService } from '../../services/admin.service';
import { ModalComponent } from '../modal/modal.component';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ModalErrorComponent } from 'src/app/modalError/modal/modal.component';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  productos:Productos[]
  busquedaProductos = new FormControl('')

  constructor(private productSvc:ProductsService,
    private adminSvc:AdminService,
    public dialog:MatDialog,
    ) { 
    this.productSvc.getAllProductsapi(1000)
    .pipe(map((res:any)=> res.productos))
    .subscribe((productos:Productos[])=>{
    this.productos = productos
    })
  }

  ngOnInit(): void {
  }


  editarProducto(producto){
    const dialogRef = this.dialog.open(ModalComponent,{
      disableClose:false,
      minWidth:"90%",
      data:producto,
    }); 
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productSvc.getAllProductsapi(1000)
        .pipe(map((res:any)=> res.productos))
        .subscribe((productos:Productos[])=>{
        this.productos = productos
        })
      }
    })
  }

  borrarProducto(producto,id,index){
      const dialogRef = this.dialog.open(ModalErrorComponent,{
        disableClose:false,
        data:{msg:`Esta seguro que desea eliminar el producto ${producto.nombre} definitivamente? `},
      }); 
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.productos.splice(index,1)
          this.adminSvc.deleteProduct(id).subscribe(
               {
               next: (res: Object) => console.log(res),
               error: (error: any) => console.log(error),
               complete: () => console.log("complete")
             }
           )
        }
    })
    
  }

}
