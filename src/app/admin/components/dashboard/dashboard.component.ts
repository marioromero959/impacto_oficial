import { Component } from '@angular/core';
import {  map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import { Usuarios } from 'src/app/shared/usuario-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  cards = [
    {title:'Usuarios'}
  ]
  usuarios = []

  constructor(private usersSvc:UsersService) {
    this.usersSvc.getAllUsers()
    .pipe(map((res:Usuarios)=> res.usuarios))
    .subscribe(
      usuarios=>{
        this.usuarios = usuarios
        console.log(usuarios);
      },
      err=>{
        console.log(err);
        
      }
    )
  }
}
