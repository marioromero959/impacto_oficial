import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productos } from 'src/app/admin/interface/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

export interface RtaMP {
  preferenceID: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  agregados:FormGroup
  producto:FormGroup
  products:Productos[] = []
  private cart = new BehaviorSubject<Productos[]>([]);

  cart$ = this.cart.asObservable();

  constructor(
    private http:HttpClient,
    private formBuilder:FormBuilder
    ){
      this.producto = this.createProductForm()
      this.agregados = this.createArrayProducts()
     }

  createArrayProducts(){
    return this.formBuilder.group({
      productos:this.formBuilder.array([])
    })
  }

  createProductForm(){
    return this.formBuilder.group({
      _id:'',
      nombre:'',
      descripcion:'',
      usuario:'',
      precio:0,
      categoria:'',
      disponible:true,
      img:'',
      cantidad:0,
    })
  }



  addCart(product:Productos){
    let producto = this.createProductForm() as FormGroup;
    producto.patchValue(product)
    //Verificamos si el producto ya esta en el carrito
    let productoRepetido = this.productos.controls.filter(p=>p.get('_id').value == product._id)
    if(productoRepetido.length >= 1){
        this.productos.push(producto)
    }else{
      //Si el producto no esta en el carrito, se agrega
      producto.patchValue({cantidad:1})
      this.productos.push(producto)
    }
    this.cart.next(this.productos.value)
  }

  get productos(){
    let productos = this.agregados.get('productos') as FormArray;
    return productos
  }

  deleteCart(index:number,product){
    if(product.cantidad > 1){
      product.cantidad = product.cantidad - 1 
    }else if(product.cantidad === 1){
      this.productos.removeAt(index)
    }
     this.cart.next(this.productos.value)
  }
  
  deleteAllCart(){
    while (this.productos.length !== 0) {
      this.productos.removeAt(0)
    }
    this.cart.next(this.productos.value)
  }

  modalMP(dataCompra){
    return this.http.post<RtaMP>(`${environment.API}/api/order`,dataCompra)
  }
}
