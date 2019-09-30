import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{
  

  categorias= ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  /* cuando quiero manipular desde el backend un elemtno del front hago esto */
  @ViewChild(IonSegment, {static: true}) segmento: IonSegment;

  constructor(private data: NoticiasService) {}

  ngOnInit(): void {
    
    this.segmento.value = this.categorias[0];
    this.cargarNoticias(this.segmento.value);
     
  }

  cambioCategoria(evento)
  {
    /* si cambio de seccion vacio el arreglo */
    this.noticias = [];

    this.cargarNoticias(evento.detail.value);
  }


  cargarNoticias(categoria: string, event?)
  {
    

    this.data.getNoticiasPorCategoria(categoria).subscribe( resp => {

      /* si no hay mas articulos cancelo el infinite scroll */
      if (resp.articles.length===0)
      {
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      /* el metodo me gtrae un vector, si quiero hacer un push de  aun articulo uso el operador spread
      que son los 3 puntos ...  */
      this.noticias.push(...resp.articles);
      
      if (event) {
        event.target.complete();
      }
    }); 
  }

  cargarMasDatos(event)
  {
    this.cargarNoticias(this.segmento.value, event);
  }
}
