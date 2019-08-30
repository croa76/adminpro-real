import { Component, OnInit, Input, Output, EventEmitter
  
  // , ViewChild, ElementRef
 } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  // @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
 
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  onChanges(nuevoValor: number) {

    // let elementoHTML = document.getElementsByName('progreso')[0];
    if ( nuevoValor < 0 ) {
      nuevoValor = 0;
    } else {
        if ( nuevoValor > 100 ) { nuevoValor = 100; }
    }

    this.progreso = nuevoValor;
    // this.txtProgress.nativeElement.value = nuevoValor;
    // elementoHTML.value = nuevoValor;
    this.cambioValor.emit(this.progreso);
  }

  public cambiarValor(valor: number) {
    let nuevoValor: number;

    nuevoValor = this.progreso + valor;

    if ( nuevoValor < 0 ) {
      nuevoValor = 0;
    } else {
        if ( nuevoValor > 100 ) { nuevoValor = 100; }
    }
    this.progreso = nuevoValor;
    this.cambioValor.emit(this.progreso);
    // Asignar el foco a un elemento
    // this.txtProgress.nativeElement.focus();
  }


}
