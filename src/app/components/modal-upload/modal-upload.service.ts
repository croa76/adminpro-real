import { Injectable, EventEmitter } from '@angular/core';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  // Escuchar que ya se terminó de cargar la imagen
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal-uploadService');

   }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }

}
