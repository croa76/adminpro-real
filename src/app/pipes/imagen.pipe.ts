import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    let url: string;
    if (!imagen) {
      imagen = '';
    }
    // Si es google. Regresa imagen sin transformación
    if (imagen.indexOf('https') >= 0) {
       return imagen;
    }
    // Regresa noimage
    if ( !imagen ) { return `${URL_SERVICIOS}/imagenes/usuarios/xxx`; }
    switch ( tipo ) {
      case 'usuario':
        url = `${URL_SERVICIOS}/imagenes/usuarios/${imagen}`;
        break;
      case 'medico':
        url = `${URL_SERVICIOS}/imagenes/medicos/${imagen}`;
        break;
      case 'hospital':
        url = `${URL_SERVICIOS}/imagenes/hospitales/${imagen}`;
        break;
      default:
        console.log('Tipo de imagen no existe. usuario, medico, hospital');
        url = `${URL_SERVICIOS}/imagenes/usuarios/xxx`;
        break;
    }
    return url;
  }

}
