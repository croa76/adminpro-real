import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {

  constructor(
    public usuarioSrv: UsuarioService
  )  {}

  canActivate() {
    if ( this.usuarioSrv.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      this.usuarioSrv.logOut();
      return false;
    }
  }

}
