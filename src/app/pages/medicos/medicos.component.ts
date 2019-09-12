import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicoService } from '../../services/medico/medico.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(
    public medicoSrv: MedicoService,
    public modalUploadSrv: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.modalUploadSrv.notificacion
        .subscribe( () => this.cargarMedicos() );
  }

  cargarMedicos() {
    console.log('cargarMedicos');

    this.medicoSrv.cargarMedicos()
      .subscribe( medicos => this.medicos = medicos);
    console.log('medicos:', this.medicos);

  }

  guardarMedico( medico: Medico) {
    this.medicoSrv.actualizarMedico( medico)
      .subscribe( resp => true);
  }

  borrarMedico( medico: Medico) {
    console.log('borrarMedico');
    this.medicoSrv.borrarMedico( medico._id)
      .subscribe( () => this.cargarMedicos() );
  }
  buscarMedico( termino: string ) {
    if (! (termino.length > 0))  {
      this.cargarMedicos();
      return;
    }

    this.medicoSrv.buscarMedico( termino )
      .subscribe( medicos => {
          this.medicos = medicos;
        }
      );
  }

  crearMedico( nombre: string ) {
    swal.fire({
      title: 'Crear medico',
      input: 'text',
      text: 'Ingrese el nombre del medico',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Ingrese el nombre del medico!';
        }
      }
    })
    .then ((resp: any ) => {
      console.log(resp);
      if ( resp.dismiss) {return; }
      console.log( 'continua' );
      this.medicoSrv.crearMedico( resp.value )
      .subscribe(() => {
        this.cargarMedicos();
      });
    });
  }

  actualizarImagen( medico: Medico ) {
    this.modalUploadSrv.mostrarModal( 'medicos', medico._id);
  }
  editarMedico( medico: Medico) {
    console.log('editarMedico');

  }
}
