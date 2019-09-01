import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string;


  constructor( public subirArchivoSrv: SubirArchivoService,
               public modalUploadSrv: ModalUploadService) {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUploadSrv.ocultarModal();
  }
  subirImagen() {
    this.subirArchivoSrv.subirArchivo( this.imagenSubir,
      this.modalUploadSrv.tipo,
      this.modalUploadSrv.id)
      .then ( (resp: any) => {
        // Emitir el mensaje
        this.modalUploadSrv.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch (err => {
        console.log('Error en la carga de archivo...');
      });
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
    }
    const reader = new FileReader ();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      // console.log(reader.result);
       this.imagenTemp = reader.result as string;
    };

    this.imagenSubir = archivo;
  }

}
