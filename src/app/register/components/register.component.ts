import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/modalError/modal/modal.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register:FormGroup;
  icon = 'visibility'
  showPassword = false;

  constructor(
      private registerSvc:RegisterService,
      private formBuilder: FormBuilder, 
      private router:Router, 
      public dialog:MatDialog,
      ) { 
      this.register = this.formBuilder.group({
        nombre: ['',Validators.required],
        correo: ['',[Validators.required,Validators.email]],
        contraseña: ['',[Validators.required, Validators.minLength(6)]],
        rol: ['USER_ROLE'],
      })
  }

  ngOnInit(): void {}

  showPass(){
  this.showPassword =! this.showPassword;
  if(this.icon == 'visibility'){
    this.icon = 'visibility_off';
  }else{
    this.icon = 'visibility';
  }
  }

  //Getters
  get nameField(){
    return this.register.get('nombre');
  }
  get emailField(){
    return this.register.get('correo');
  }
  get passField(){
    return this.register.get('contraseña');
  }

  //Errors Fields
  errorEmail(){
    if (this.emailField?.hasError('required')) {
      return 'Debes escribir tu email';
    }
    return this.emailField?.hasError('email') ? 'No es un email válido' : '';
  } 

  toRegister(){
    if(this.register.invalid){
      this.register.markAllAsTouched();
    }else{
      this.registerSvc.register(this.register.value).subscribe(
        {
          next:(res)=>this.router.navigate(['/login']),
          error:(err)=>{
            const dialogRef = this.dialog.open(ModalErrorComponent,{
              disableClose:false,
              data:err.error.errors[0].msg
              });
            },
          complete:()=>console.log("complete")
        }
      )


    } 
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
