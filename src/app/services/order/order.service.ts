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
    let productoRepetido = this.productos.controls.find(p=>p.get('_id').value == product._id)
    if(productoRepetido){
      productoRepetido.get('cantidad').setValue(productoRepetido.get('cantidad').value + 1)
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

  deleteCart(product){
    let productoRepetido = this.productos.controls.find(p=>p.get('_id').value == product._id)
    if(productoRepetido){
      productoRepetido.get('cantidad').setValue(productoRepetido.get('cantidad').value - 1)
    }
    if(productoRepetido.get('cantidad').value === 0){
      let index = this.productos.controls.findIndex(p=>p.get('_id').value == product._id)
      this.productos.removeAt(index)
    }
     this.cart.next(this.productos.value)
  }

  deleteProductCart(product){
    this.productos.controls.forEach(p=>{
      if(p.get('_id').value == product._id){
        let index = this.productos.controls.findIndex(p=>p.get('_id').value == product._id)
        this.productos.removeAt(index)
      }
    })
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

  cargarOrden(ordenId:string){
    //cargo la orden de compra para compararla despues con los productos vendidos
    const orderId = {ordenId:ordenId}
    return this.http.post<any>(`${environment.API}/api/compras/cargarCompra`,orderId)
  }

}
