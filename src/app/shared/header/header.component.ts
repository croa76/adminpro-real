import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(
    public usuarioSrv: UsuarioService,
    public router: Router
    ) { }

  ngOnInit() {
    this.usuario = this.usuarioSrv.usuario;
  }

  buscar( termino: string ) {
    // console.log('termino: ', termino);
    this.router.navigate(['/busqueda', termino ]);
  }
}
