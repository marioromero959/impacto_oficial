import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private _http:HttpClient) { }

  enviarMail(correo:any){
    return this._http.post(`${environment.API}/api/email`,{emailBody:correo});
  }
}
//TODO