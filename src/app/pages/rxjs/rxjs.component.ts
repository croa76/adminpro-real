import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {


    let contador = 0;

    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(5)
    // )
    .subscribe(
      numero => console.log('Subs:', numero),
      error => console.log('Error en el observable:', error ),
      () => console.log('El observador terminó' )
      );

   }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable ( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval ( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);
        // if (contador === 5) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter ( (valor, index) => (valor % 2) === 1)
    );
  }
}
