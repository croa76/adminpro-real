import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../service/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = (this.email.length > 0 ) ? true : false;
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init ({
        client_id: '283397737694-6jt9sg92r82dguohq6s8gvoh4oli2a5j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));

    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard'
          );
    });
  }

  ingresar( forma: NgForm   ) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame)
    .subscribe(() => this.router.navigate([ '/dashboard'])
              );
  }
}
