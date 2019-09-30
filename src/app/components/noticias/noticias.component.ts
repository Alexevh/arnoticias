import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  /* la pagina que me llame va a mandar,me un vector de noticias */
  @Input() noticias: Article[] =[];

  /** voy a detectar si esta en favoritos */
  @Input() enFavoritos =false;
  
  constructor() { }

  ngOnInit() {}

}
