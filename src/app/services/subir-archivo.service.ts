import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise( (resolve , reject ) => {
      const formData = new FormData();

      // Petición Ajax
      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name);

      // Para ser notificados de cualquier cambio
      // Tambien se pudo haber usado una función de flecha
      xhr.onreadystatechange = function() {
        // Recibo información cada que el estado cambia.
        // Solo me interesa el 4 (terminó de cargar el archivo)
        if (xhr.readyState === 4 ) {
          if (xhr.status === 200 ) {
            resolve( JSON.parse(xhr.response));
          } else {
            reject( xhr.response);
          }
        }
      };

      const url = ` ${URL_SERVICIOS}/upload/${tipo}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send( formData);

    });
  }

}
