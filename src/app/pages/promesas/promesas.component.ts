import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres()
      .then (
      (data) => console.log('Termino:', data)
      )
      .catch( error => console.error('Error en la promesa.', error));


   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        console.log('contador:', contador);

        if (contador === 3 ) {
          // resolve();
          //resolve('ok');
          resolve( true );
          reject('Reject a propósito');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
