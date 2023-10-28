import { Component,Inject,ViewChild,ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent{
  formularioProducto: FormGroup;
  imagenProducto: File;

  blobs = []; //url de fotos locales
  imagenesProducto = []; //imagenes a cargar
  showImagenes = []; //urls de fotos del back + locales
  borradas: string[] = []; //urls de fotos del back que se borraron

  viewImg: any = '../../../../assets/no-img.png';
  categorias = [];
  id: string = '';
  mode: 'indeterminate';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private adminSvc: AdminService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formularioProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', Validators.required],
      stock: null,
      img: [''],
      descripcion: [''],
    });

    this.data.img.forEach((urlImg) => {
      this.showImagenes.push(urlImg);
    });
    const { _id, nombre,stock, precio, categoria, img, descripcion } = this.data;
    const producto = {
      nombre,
      stock,
      categoria: categoria._id,
      precio,
      descripcion,
    };
    this.id = _id;
    this.adminSvc.getCategories().subscribe((res) => {
      this.categorias = res['categorias'];
    });
    this.cargarProducto(producto);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  cargarProducto(producto) {
    this.formularioProducto.patchValue(producto);
  }

  //Productos
  cargarImg = async (e) => {
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
          this.showImagenes.push(reader.result);
        };
        if (
          !this.imagenesProducto
            .map((img) => img.name)
            .includes(imagenes[i].name)
        ) {
          this.imagenesProducto.push(imagenes[i]);
        }
      }
    }
    //con esta linea, limpio el ultimo valor del input para poder agregar la misma imagen cuando quiera
    this.fileInput.nativeElement.value = '';
  };

  eliminarImg(id, img: string) {
    //valido si es una img de cloudinary
    if (img.search('https://res.cloudinary') === 0) {
      this.borradas.push(img);
      this.showImagenes.splice(id, 1);
    } else {
      let index = this.blobs.map((blob) => blob.blob).indexOf(img);
      this.showImagenes.splice(id, 1);
      this.imagenesProducto.splice(index, 1);
      this.blobs.splice(index, 1);
    }
  }

  editarProducto() {
    if (this.formularioProducto.invalid) {
      this.formularioProducto.markAllAsTouched();
    } else {
      const { categoria, nombre,stock, precio, descripcion } =
        this.formularioProducto.value;
      const product = {
        id: this.id,
        nombre,
        categoria,
        precio,
        stock,
        descripcion,
      };
      
      this.adminSvc.editProduct(product).subscribe(
        (res: any) => {
          if (this.imagenesProducto.length > 0 || this.borradas.length > 0) {
            if (this.imagenesProducto.length > 8) {
              this.openSnackBar(
                'Se pueden agregar solo hasta 8 imagenes por producto!'
              );
            } else {
              this.adminSvc
                .uploadProductImg(this.imagenesProducto, res._id, this.borradas)
                .then((producto) => {
                  this.dialogRef.close(producto.modelo);
                  this.openSnackBar('¡Producto editado correctamente!');
                })
                .catch((error) => console.error(error));
            }
          } else {
            this.openSnackBar('¡Producto editado correctamente!');
            this.dialogRef.close(res);
          }
        },
        (err) => {
          console.error(err);
          this.openSnackBar(err);
        }
      );
    }
  }
}
