import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {
  
  constructor(private paisService: PaisService){}

  termino: string = "";
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  buscar(termino: string){

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe((pais) => {
        this.paises = pais;
      }, (err) =>{
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.paisService.buscarPais(termino)
      .subscribe(pais => this.paisesSugeridos = pais.splice(0,10),
      (err) => this.paisesSugeridos = []);
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }
  

}
