import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public http: HttpClient,
               public usuarioSrv: UsuarioService ) { }

  cargarMedicos() {
    let url = `${URL_SERVICIOS}/medico?token=${this.usuarioSrv.token}`;
    return this.http.get( url )
    .pipe (
       map ( (resp: any) => {
         this.totalMedicos = resp.total;
         return resp.medicos;
      })
      );
  }

  
  borrarMedico( id: string ) {
    const url = `${URL_SERVICIOS}/medico/${id}?token=${this.usuarioSrv.token}`;
    return this.http.delete( url )
    .pipe (
      map( resp => swal.fire('Medico borrado', 'Eliminado correctamente', 'success'))
    );
  }

  crearMedico( nombre: string ) {
    const url = `${URL_SERVICIOS}/medico?token=${this.usuarioSrv.token}`;
    return this.http.post(url, {nombre})
    .pipe (
      map (( resp: any) => resp.medico )
    );
  }

  guardarMedico( medico: Medico ) {

    let url: string ;

    if ( medico._id ) {
      swal.fire('Registro-existente', medico.nombre, 'success');
      url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioSrv.token}`;
      
      return this.http.put(url, medico )
      .pipe (
        map (( resp: any) => {
          swal.fire('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        } )
      );
    } else {
      swal.fire('Nuevo-registro', medico.nombre, 'success');
      url = `${URL_SERVICIOS}/medico?token=${this.usuarioSrv.token}`;
      return this.http.post(url, medico )
      .pipe (
        map (( resp: any) => {
          swal.fire('Médico creado', medico.nombre, 'success');
          return resp.medico;
        } )
      );
    }

  }

  buscarMedico( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${ termino }`;
    return this.http.get( url )
    .pipe (
      map( ( resp: any ) => resp.medicos )
    );
  }

  actualizarMedico( medico: Medico ) {
    const url = `${URL_SERVICIOS}/medico/${ medico._id }?token=${this.usuarioSrv.token}`;
    return this.http.put( url, medico)
      .pipe (
        map( ( resp: any ) => {
          swal.fire('Médico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
  }

  cargarMedico( id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get ( url )
      .pipe(
        map( ( resp: any ) => {
          return resp.medico;
        } )
      );
  }

}
