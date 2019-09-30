import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  /* esto es por que como la pantalla de no hay favoritos es un sldie de esta manera le quiero el movimiento */
 sliderOpt ={
  allowSlidePrev: false,
  allowSlideNext: false
 }

  //noticias: Article[] =[];

  constructor(public data: DataLocalService) {}



}
