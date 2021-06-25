import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent  {

  regiones: string[] = ["africa", "americas", "asia", "europe", "oceania"];
  regionActiva: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCss(region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary me-1' : 'btn btn-outline-primary me-1';
  }

  activarRegion(region: string){
    
    if(region === this.regionActiva) {return};

    this.regionActiva = region;
    this.paises = [];

    this.paisService.getPaisporRegion(region)
      .subscribe(pais => this.paises = pais,
      (err) =>{
        this.hayError = true;
        this.paises = [];
      });
  }

}
