import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde  = 0;

  totalRegistros = 0;

  cargando = false;

  rolesValidos = [
    {valor: 'ADMIN_ROLE', etiqueta: 'ADMIN'},
    {valor: 'USER_ROLE', etiqueta: 'USER'}]
    ;
  constructor( public usuariosSrv: UsuarioService,
               public modalUploadSrv: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadSrv.notificacion
    .subscribe ( () => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this.modalUploadSrv.mostrarModal ('usuarios', id);
  }

  cargarUsuarios() {
      this.cargando = true;
      this.usuariosSrv.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
        });
      this.cargando = false;
  }

  cambiarDesde( valor: number) {
     const nuevoValor: number = this.desde + valor;
     if (nuevoValor < 0 || nuevoValor > this.totalRegistros) {return;};

     this.desde = nuevoValor;
     this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    this.cargando = true;

    if (termino === '') {
      this.desde  = 0;
      this.cargarUsuarios();
    } else {
      this.usuariosSrv.buscarUsuarios(termino)
      .subscribe( (resp: any ) => {
        this.usuarios = resp;
      });
    }

    this.cargando = false;

  }

  borrarUsuario( usuario: Usuario) {
    if (this.usuariosSrv.usuario._id === usuario._id) {
      swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo','error' );
       return;
    }

    swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar a ${usuario.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario',
      cancelButtonText: '¡No, cancelar!',
    }).then((result) => {
      if (result.value) {
        this.usuariosSrv.borrarUsuario(usuario._id)
        .subscribe( (resp: any) => {
          this.desde = 0;
          this.cargarUsuarios();
          swal.fire(
            'Usuario borrado',
            `El usuario (${usuario.nombre}) ha sido borrado`,
            'success'
          );
        });
      }
    });
  } //borrar usuario

  guardarUsuario( usuario: Usuario) {
    this.usuariosSrv.actualizarUsuario( usuario, false)
    .subscribe();
  }
}
