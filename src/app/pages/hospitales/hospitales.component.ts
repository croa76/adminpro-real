import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/service/service.index';
import { log } from 'util';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  constructor( 
    public hospitalSrv: HospitalService, 
    public modalUploadSrv: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadSrv.notificacion
        .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this.hospitalSrv.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales);
  }

  guardarHospital( hospital: Hospital) {
    this.hospitalSrv.actualizarHospital( hospital)
      .subscribe( resp => true);
  }

  borrarHospital( hospital: Hospital) {
    console.log('borrarHospital');
    this.hospitalSrv.borrarHospital( hospital._id)
      .subscribe( () => this.cargarHospitales() );
  }

  buscarHospital( termino: string ) {
    if (! (termino.length > 0))  {
      this.cargarHospitales();
      return;
    }

    this.hospitalSrv.buscarHospital( termino )
      .subscribe( hospitales => {
          this.hospitales = hospitales;
        }
      );
  }

  crearHospital( nombre: string ) {
    swal.fire({
      title: 'Crear hospital',
      input: 'text',
      text: 'Ingrese el nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Ingrese el nombre del hospital!';
        }
      }
    })
    .then ((resp: any ) => {
      console.log(resp);
      if ( resp.dismiss) {return; }
      console.log( 'continua' );
      this.hospitalSrv.crearHospital( resp.value )
      .subscribe(() => {
        this.cargarHospitales();
      });
    });
  }

  actualizarImagen( hospital: Hospital ) {
    this.modalUploadSrv.mostrarModal( 'hospitales', hospital._id);
  }
}
