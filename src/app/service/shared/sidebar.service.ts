import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [];
  // menu: any = [
  //   {titulo: 'Principal',
  //    icono: 'mdi mdi-gauge',
  //    submenu: [
  //     { titulo: 'Dashboard', url: '/dashboard'},
  //     { titulo: 'ProgressBar', url: '/progress'},
  //     { titulo: 'Graficas', url: '/graficas1'},
  //     { titulo: 'Promesas', url: '/promesas'},
  //     { titulo: 'Rxjs', url: '/rxjs'}
  //    ]
  //   },

  //   {titulo: 'Mantenimiento',
  //    icono: 'mdi mdi-folder-lock-open',
  //    submenu: [
  //     { titulo: 'Usuarios', url: '/usuarios'},
  //     { titulo: 'Hospitales', url: '/hospitales'},
  //     { titulo: 'Médicos', url: '/medicos'}
  //    ]
  //   }
  // ];

  constructor( public usuarioSrv: UsuarioService) {
    this.cargarMenu();
  }

  cargarMenu() {
    this.menu =  this.usuarioSrv.menu;
  }

}

