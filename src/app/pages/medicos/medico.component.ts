import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/service/service.index';
import { subscribeOn } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('','',''); 

  constructor(
    public medicoSrv: MedicoService,
    public hospitalSrv: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadSrv: ModalUploadService
    ) {
      this.activatedRoute.params.subscribe( params => {
        const id = params[ 'id' ];
        if ( id !== 'nuevo') {
          console.log( id ); 
          this.cargarMedico( id );
        }
      })
    }

  ngOnInit() {
    this.hospitalSrv.cargarHospitales()
       .subscribe( (hospitales) => this.hospitales = hospitales);

    this.modalUploadSrv.notificacion
      .subscribe( ( resp: any ) => {
        this.medico.img = resp.medico.img;

      });
    }

  guardarMedico( f: NgForm ) {

    if ( f.invalid ) { return; }

    this.medicoSrv.guardarMedico( this.medico )
      .subscribe( medico => {
        console.log('regresa guarda, ',  medico);

        this.medico._id = medico._id;
        console.log('redirecciona');

        this.router.navigate([ '/medico', medico._id ]);
      });

    }

  cargarMedico( id: string ) {
    let idHospital: string;

    this.medicoSrv.cargarMedico( id )
    .subscribe( (medico: any) => {
      idHospital = medico.hospital._id;
      this.medico = medico;
      this.medico.hospital = idHospital;
      this.cambioHospital( idHospital );
    });
  }

  cambioHospital( id: string ) {
    this.hospitalSrv.obtenerHospital( id )
      .subscribe( hospital => {
        this.hospital = hospital;
      } );
  }

  cambiarFoto() {
    this.modalUploadSrv.mostrarModal('medicos', this.medico._id);
  }
}
