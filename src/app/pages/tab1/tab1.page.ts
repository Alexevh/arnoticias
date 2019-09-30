import { Component, OnInit } from "@angular/core";
import { NoticiasService } from "../../services/noticias.service";
import { Article } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor(private data: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarMasDatos(evento) {
    this.cargarNoticias(evento);
  }

  /* quiero controlar el fin del scroll, pongo un ? para hacer el parametro opcional */
  cargarNoticias(event?) {
    /* al hacer esto asi, hago el get, la respuesta se guarda en la variable resp y al abrir la funcion
    lambda meto ahi el codigo que trabaja */
    this.data.getTitulares().subscribe(resp => {

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
}
