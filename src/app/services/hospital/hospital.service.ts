import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;
  constructor( public http: HttpClient, 
               public usuarioSrv: UsuarioService) { }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;
    return this.http.get( url )
    .pipe (
       map ( (resp: any) => {
         this.totalHospitales = resp.total;
         return resp.hospitales;
      })
      );
  }

  obtenerHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioSrv.token}`;
    return this.http.get ( url )
      .pipe(
        map( ( resp: any ) => resp.hospital )
      );
  }

  borrarHospital( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioSrv.token}`;
    console.log(url);

    return this.http.delete( url )
    .pipe (
      map( resp => swal.fire('Hospital borrado', 'Eliminado correctamente', 'success'))
    );
  }

  crearHospital( nombre: string ) {
    const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioSrv.token}`;
    return this.http.post(url, {nombre})
    .pipe (
      map (( resp: any) => resp.hospital )
    );
  }

  buscarHospital( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${ termino }`;
    return this.http.get( url )
    .pipe (
      map( ( resp: any ) => resp.hospitales )
    );
  }

  actualizarHospital( hospital: Hospital ) {
    const url = `${URL_SERVICIOS}/hospital/${ hospital._id }?token=${this.usuarioSrv.token}`;
    return this.http.put( url, hospital)
      .pipe (
        map( ( resp: any ) => {
          swal.fire('Hospital actualizado', hospital.nombre, 'success');
          return resp.hospital;
        })
      );
  }

}
