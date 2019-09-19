import { Component, OnInit } from '@angular/core';
import { UsuarioService, SidebarService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor( public sidebarSrv: SidebarService,
               public usuarioSrv: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioSrv.usuario;
    this.sidebarSrv.cargarMenu();
  }

}
