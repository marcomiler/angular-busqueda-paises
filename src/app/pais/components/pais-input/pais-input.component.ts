import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent  implements OnInit{
  
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  @Input()
  placeholder: string = '';
  termino: string = '';
  
  debouncer: Subject<string> = new Subject();

  ngOnInit(): void {//SE DISPARA UNA SOLA VEZ
  this.debouncer
  .pipe(debounceTime(300))  //para que las sugerencias no aparezcan de inmediato
  .subscribe(valor => {
        this.onDebounce.emit(valor);
      });
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }
}
