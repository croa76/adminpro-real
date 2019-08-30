import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../service/service.index';
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any) {

    this.aplicarCheck( link );
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck( link: any) {
    const selectores: any  = document.getElementsByClassName('selector');

    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const temaActual = this._ajustes.ajustes.tema;
    const selectores: any  = document.getElementsByClassName('selector');
    
    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === temaActual) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
