import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';


import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  
  pais!: Country;
  translations!: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }//para suscribirnos a cualquier cambio de la url

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap((param) => this.paisService.getPaisporAlpha(param.codigoPais)),
        tap(console.log)
      )
      .subscribe(pais =>{
        //console.log(pais);
        this.pais = pais;
        this.translations = Object.values(this.pais.translations);
      })

    //Otra manera:
    // this.activatedRoute.params
    // .subscribe(params => {
    //   console.log(params.codigoPais);
    //   this.paisService.getPaisporAlpha(params.codigoPais)
    //     .subscribe(pais => {
    //       console.log(pais);
    //     })
    // })
  }

}
