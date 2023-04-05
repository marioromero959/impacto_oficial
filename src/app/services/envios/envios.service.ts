import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pedido } from 'src/app/shared/pedido-interface';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

 bodyPedido:Pedido = {
   contrato:"300006611",
   origen:{
     postal:{
       codigoPostal: "",
       localidad:"",
       calle:"",
       numero:"",
       region:"",
       pais:"",
       componentesDeDireccion:{
         meta:"",
         contenido:""
       }
     }
   },
   destino:{
     postal:{
       codigoPostal: "",
       localidad:"",
       calle:"",
       numero:"",
       region:"",
       pais:"",
       componentesDeDireccion:{
         meta:"",
         contenido:""
       }
     }
   },
   remitente:{
     nombreCompleto:"",
     email:"",
     documentoTipo:"", 
     documentoNumero:"",
     telefonos:[
       {
         tipo:"",
         numero:""
       }
     ],
   },
   destinatario:[
     {
       nombreCompleto:"",
       email:"",
       documentoTipo:"",
       documentoNumero:"",
       telefonos:[
         {
           tipo:"",
           numero:""
         }
       ],
     }
   ],
   bultos:[
     {
       kilos:"",
       largoCm:"",
       altoCm:"",
       anchoCm:"",
       volumenCm:"",
       valorDeclaradoSinImpuestos:"",
       valorDeclaradoConImpuestos:"",
       referencias:[
         {
           meta:"",
           contenido:""
         }
       ],
     }
   ]
 }

  constructor(private _http: HttpClient) { }

  obtenerLocalidades(){
    return this._http.get(`${environment.API_ANDREANI}/localidades`)
  }
  obtenerSucursales(){
    return this._http.get(`${environment.API_ANDREANI}/sucursales`)
  }

  crearOrdenEnvio(){
    const headers = new HttpHeaders({
      'x-authorization-token':localStorage.getItem('token-andreani')
    })
    return this._http.post(`${environment.API_ANDREANI}/ordenes-de-envio`,this.bodyPedido,{headers})
  }

}
