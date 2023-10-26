import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalErrorComponent implements OnInit {

  isInventario:boolean = false

  constructor( 
    public dialogRef: MatDialogRef<ModalErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ) {}

  ngOnInit(): void {
    //si tiene la propiedad msg, viene desde eliminar producto en el inventario
    this.isInventario = (this.data.msg) ? true : false; 
  }

  close(res){
    this.dialogRef.close(res)
  }

}
