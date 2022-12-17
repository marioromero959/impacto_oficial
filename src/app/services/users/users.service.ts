import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/shared/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<Usuarios>(`${environment.API}/api/users`);
  }
}
