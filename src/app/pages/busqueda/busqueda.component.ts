import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar( termino );
      });
  }

  ngOnInit() {
  }

  buscar( termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get(url)
        .subscribe( (respuesta: any ) => {
          this.hospitales = respuesta.hospitales;
          this.medicos = respuesta.medicos;
          this.usuarios = respuesta.usuarios;

          console.log(this.hospitales);
          console.log(this.medicos);
          console.log(this.usuarios);
        } );

  }
}
