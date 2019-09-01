import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/service.index';
import { ThemeService } from 'ng2-charts';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor( public usuarioSrv: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioSrv.usuario;
  }

  guardar( usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioSrv.actualizarUsuario( this.usuario)
    .subscribe();
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
    }
    let reader = new FileReader ();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      // console.log(reader.result);
       this.imagenTemp = reader.result as string;
    };

    this.imagenSubir = archivo;
  }

  cargarImagen() {
    this.usuarioSrv.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
