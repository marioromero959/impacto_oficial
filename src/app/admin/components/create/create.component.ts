import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modalError/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  formularioProducto: FormGroup;
  formularioCategoria: FormGroup;

  imagenProducto: File;
  imagenesProducto: File[] = [];
  blobs = [];
  viewImg: any = '../../../../assets/no-img.png';
  showSpinner: boolean = false;
  categorias = [];
  stockProducto:number = 0;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc: AdminService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.formularioProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      descripcion: [''],
    });
    this.formularioCategoria = this.formBuilder.group({
      editar: this.formBuilder.group({
        categoria: ['', Validators.required],
        nombre: ['', Validators.required],
      }),
      crear: this.formBuilder.group({
        nombre: ['', Validators.required],
      }),
      eliminar: this.formBuilder.group({
        categoria: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.getAllcategories();
  }

  getAllcategories() {
    this.adminSvc.getCategories().subscribe((res) => {
      this.categorias = res['categorias'];
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  crearCategoria() {
    if (this.formularioCategoria.get(['crear', 'nombre']).invalid) {
      this.formularioCategoria.get(['crear']).markAllAsTouched();
    } else {
      this.showSpinner = true;
      this.adminSvc.addCategory(this.formularioCategoria.value.crear).subscribe(
        (res) => {
          this.showSpinner = false;
          this.openSnackBar('¡Categoria creada correctamente!');
          this.getAllcategories();
        },
        (err) => {
          this.showSpinner = false;
          this.dialog.open(ModalComponent, {
            disableClose: false,
            data: err.error.msg,
          });
        }
      );
    }
  }

  editarCategoria() {
    if (this.formularioCategoria.get(['editar']).invalid) {
      this.formularioCategoria.get(['editar']).markAllAsTouched();
    } else {
      this.showSpinner = true;
      this.adminSvc
        .editCategory(this.formularioCategoria.value.editar)
        .subscribe(
          (res) => {
            this.showSpinner = false;
            this.openSnackBar('¡Categoria editada correctamente!');
            this.getAllcategories();
          },
          (err) => {
            this.showSpinner = false;
            this.dialog.open(ModalComponent, {
              disableClose: false,
              data: err.error.msg,
            });
          }
        );
    }
  }

  eliminarCategoria() {
    if (this.formularioCategoria.get(['eliminar']).invalid) {
      this.formularioCategoria.get(['eliminar']).markAllAsTouched();
    } else {
      this.showSpinner = true;
      this.adminSvc
        .deleteCategory(this.formularioCategoria.value.eliminar)
        .subscribe(
          (res) => {
            this.showSpinner = false;
            this.openSnackBar('¡Categoria eliminada correctamente!');
            this.getAllcategories();
          },
          (err) => {
            this.showSpinner = false;
            this.dialog.open(ModalComponent, {
              disableClose: false,
              data: err.error.msg,
            });
          }
        );
    }
  }

  //Productos
  cargarImg(e) {
    let imagenes = e.target.files;
    for (const i in imagenes) {
      if (!isNaN(Number(i))) {
        let reader = new FileReader();
        let url = reader.readAsDataURL(imagenes[i]);
        reader.onloadend = () => {
          if (!this.blobs.includes(reader.result))
            this.blobs.push({
              id: i,
              blob: reader.result,
            });
        };
        if (
          !this.imagenesProducto
            .map((img) => img.name)
            .includes(imagenes[i].name)
        ){
          this.imagenesProducto.push(imagenes[i]);
        }
      }
    }
    this.fileInput.nativeElement.value = '';
  }

  eliminarImg(id) {
    this.imagenesProducto.splice(id, 1);
    this.blobs.splice(id, 1);
  }

  changeStock(e) {
    const stock = Number(e.target.value);
    this.formularioProducto.get('stock').patchValue(stock);
  }

  crearProducto() {
    if (this.formularioProducto.invalid) {
      this.formularioProducto.markAllAsTouched();
    } else {
      this.showSpinner = true;
      const { categoria, nombre, precio, stock, descripcion } = this.formularioProducto.value;
      
      const product = { nombre, categoria, precio, stock, descripcion };
      this.adminSvc.addProduct(product).subscribe(
        (res: any) => {
          this.showSpinner = false;
          if (this.imagenesProducto.length > 8) {
            this.openSnackBar(
              'Se pueden agregar solo hasta 8 imagenes por producto!'
            );
          } else {
            this.adminSvc
              .uploadProductImg(this.imagenesProducto, res._id)
              .then((img) => {
                this.openSnackBar('Producto creado correctamente!');
                this.formularioProducto.reset();
              })
              .catch((error) => console.error(error));
          }
        },
        (err) => {
          this.showSpinner = false;
          this.dialog.open(ModalComponent, {
            disableClose: false,
            data: err.error.msg,
          });
        }
      );
    }
  }
}
