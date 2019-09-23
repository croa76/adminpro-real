import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config';
import { map, catchError } from 'rxjs/operators';

// import swal from 'sweetalert';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoSrv: SubirArchivoService
    ) {
      this.cargarStorage();
  }

  renuevaToken() {
    const url = `${URL_SERVICIOS}/login/renuevatoken?token=${this.token}`;
    console.log('renuevaToken');
    
    return this.http.get(url,  {})
      .pipe(
        map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token) ;
          return true;
        }),
        catchError(  err  => {
          this.router.navigate(['/login']);
          swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
          return  Observable.throw( err );
        })
      );
  }
  
  estaAutenticado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle( token: string) {
    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, {token})
      .pipe(
        map( (resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        })
      );
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario)
      .pipe (
        map ( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError(  err  => {
          swal.fire('Error al validar usuario', err.error.mensaje, 'error');
          return  Observable.throw( err );
        })
      );
  }

  crearUsuario( usuarioIn: Usuario) {
    const url = `${URL_SERVICIOS}/usuario`;
    const usuario = {
      nombre: usuarioIn.nombre  ,
      email: usuarioIn.email ,
      password: usuarioIn.password.toString() ,
      role: usuarioIn.role
    };

    return this.http.post(url, usuario )
    .pipe (
      map( (resp: any) => {
        swal.fire ('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError(  err  => {
        swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return  Observable.throw( err );
      })
    );
  }

  actualizarUsuario( usuario: Usuario, Autenticado = true ) {
    const url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
    return this.http.put( url, usuario )
      .pipe (
        map( ( resp: any ) => {
          if (Autenticado) {
            const usuarioDB: Usuario = resp.usuario;
            this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu);
          }
          swal.fire('Usuario actualizado', usuario.nombre, 'success');
        }),
        catchError(  err  => {
          swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          return  Observable.throw( err );
        })
      );
  }

  cambiarImagen( archivo: File, id: string) {
    this.subirArchivoSrv.subirArchivo( archivo, 'usuarios', id )
    .then ( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal.fire('Imagen actualizada', this.usuario.nombre + '-' + this.usuario.img, 'success');
      this.guardarStorage(id, this.token, this.usuario, this.menu);
    })
    .catch ( resp => {
    });
  }

  cargarUsuarios( desde: number = 0) {
    const url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios( termino: string ) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${ termino }`;
    return this.http.get( url )
    .pipe (
      map( ( resp: any ) => resp.usuarios)
    );
  }

  borrarUsuario( id: string ) {
    const url = `${URL_SERVICIOS}/usuario/${ id }?token=${this.token}`;
    return this.http.delete( url );
  }

}
