import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class VerificaTokenGuard implements CanActivate {
  constructor(
    public usuarioSrv: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioSrv.token;
    let payload = JSON.parse( atob ( token.split('.')[1] ));
    let fechaExpiracion = payload.exp;
    const expirado = this.expirado( fechaExpiracion );

    if (expirado) {
      this.router.navigate(['/login']);
      console.log('vencido');
      return false;
    }

    const tokenExpxx = new Date( fechaExpiracion * 1000 );
    return this.verificaRenueva( fechaExpiracion);

  }

  verificaRenueva( fechaExp: number): Promise<boolean> {
    console.log('verificaRenueva');
    
    return  new Promise ( ( resolve, reject ) => {
      // fechaExp está en segundos y lo necesitamos en milisegundos
      const tokenExp = new Date( fechaExp * 1000 );
      const fechaRenovacion = new Date();
      // 5 minutos
      fechaRenovacion.setTime( fechaRenovacion.getTime() + ( 60 * 1000 * 5 ) );

      if (tokenExp.getTime() > fechaRenovacion.getTime() ) {
        console.log('resuelve true');
        
        resolve (true);
      } else {
        console.log('renuevaToken');
        
        this.usuarioSrv.renuevaToken()
          .subscribe( () => {
              resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject ( false ) ;
          }
          );
      }


    });
  }
  expirado( fechaExp: number ) {
    let ahora = new Date().getTime() / 1000;
    const resultado = fechaExp < ahora;
    return resultado;
  }
}
