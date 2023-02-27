import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacto:FormGroup;
  enviado:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _email: MailService,
    private _snackBar: MatSnackBar
    ) {
    this.contacto = this.formBuilder.group({
      nombre: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      telefono: [''],
      msg: ['',Validators.required],
    })
   }

  ngOnInit(): void {}

   get nombreCampo(){
    return this.contacto.get('nombre');
  }
  get emailCampo(){
    return this.contacto.get('email');
  }
  get msgCampo(){
    return this.contacto.get('msg');
  }
  
    errorEmail(){
      if (this.emailCampo?.hasError('required')) {
        return 'Debes escribir tu email';
      }
      return this.emailCampo?.hasError('email') ? 'No es un email válido' : '';
    } 
  enviar(){
    if(this.contacto.valid){
      this._email.enviarMail(this.contacto.value).subscribe((res:any)=>{
        this.openSnackBar("Email enviado correctamente",2000);
        this.contacto.reset();
        this.enviado = true;
      });
    }else{
      this.contacto.markAllAsTouched();
    }
  } 
  openSnackBar(message:string,duration) {
    this._snackBar.open(message, '', {
      horizontalPosition:'center',
      verticalPosition: 'top',
      duration:duration
    });
  }
}
