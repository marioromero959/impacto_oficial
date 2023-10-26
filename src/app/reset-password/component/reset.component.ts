import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'src/app/modalError/modal/modal.component';
import { UsersService } from 'src/app/services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm:FormGroup;
  fromEmail = false;//significa que ya hizo la validacion por email
  icon1 = 'visibility'
  icon2 = 'visibility'
  showPassword1 = false;
  showPassword2 = false;
  id:string = '';

  constructor(
      private userSvc:UsersService,
      private formBuilder: FormBuilder, 
      private router:Router, 
      private route: ActivatedRoute,
      public dialog:MatDialog,
      private _snackBar: MatSnackBar,
      ) { 
        this.route.params.subscribe(params => {
          this.id = params['id'];
          this.fromEmail = !!this.id
        });

      this.resetForm = this.formBuilder.group({
        correo: ['',[Validators.required,Validators.email]],
        contraseña: ['',Validators.required],
        re_contraseña: ['',Validators.required],
      })
  }

  ngOnInit(): void {}

  showPass(passItem:number){
    if(passItem == 1){
      this.showPassword1 =! this.showPassword1;
      if(this.icon1 == 'visibility'){
        this.icon1 = 'visibility_off';
      }else{
        this.icon1 = 'visibility';
      }
    }else{
      this.showPassword2 =! this.showPassword2;
      if(this.icon2 == 'visibility'){
        this.icon2 = 'visibility_off';
      }else{
        this.icon2 = 'visibility';
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  resetPass(){
    //Esta parte envia el mail para validar el correo electronico
    if(!this.fromEmail && this.resetForm.get('correo').valid){
      this.userSvc.sendMailToResetPassword(this.resetForm.value.correo).subscribe(
        {
          next:(res)=>this.openSnackBar(`Email enviado correctamente a ${this.resetForm.value.correo}`),
          error:(err)=>{
            this.dialog.open(ModalErrorComponent,{
              disableClose:false,
              data:err.error.msg
              });
            },
          complete:()=>this.goTo('/login')
        }
      )
    }
    //Esta parte resetea la contraseña una vez que se valido el mail
    if(this.resetForm.valid && this.samePass && this.fromEmail){
      this.userSvc.resetPassword(this.id,this.resetForm.value).subscribe(
        {
          next:(res)=>this.openSnackBar(`¡Contraseña reestablecida correctamente!`),
          error:(err)=>{
            this.dialog.open(ModalErrorComponent,{
              disableClose:false,
              data:err.error.msg
              });
            },
          complete:()=>this.goTo('/login')
        }
      )
    }else{
      this.resetForm.markAllAsTouched()
    }
  }

  //Getters
  get emailField(){
    return this.resetForm.get('correo');
  }
  get passField(){
    return this.resetForm.get('contraseña');
  }
  get rePassField(){
    return this.resetForm.get('re_contraseña');
  }
  get samePass (){
    return this.passField.value == this.rePassField.value
  }

  //Errors Fields
  errorEmail(){
    if (this.emailField?.hasError('required')) {
      return 'Debes escribir tu email';
    }
    return this.emailField?.hasError('email') ? 'No es un email válido' : '';
  } 

  goToHome(){
    this.router.navigate(['/home'])
  }

  goTo(param){
    this.router.navigate([`/${param}`])
  }
}
