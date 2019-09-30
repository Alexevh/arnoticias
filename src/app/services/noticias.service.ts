import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;


/* la API de noticias nos pemite mandarla por la url o en el header de la peticion, vamos a meter en headers un ejmeplo
 */
const headers = new HttpHeaders(
  {
    'X-Api-key': apiKey,
  }
);

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

/* como voy a paginar los resultados necesito un contador */
headlinePage = 0;

categoriaActual= '';
categoriaPage = 0;


  constructor(private http: HttpClient) { }



  /* como esta funcion es generica, le ponemos <T> para decirle que va a recibit un tipo
  luego en las funciones donde la llamamos le vamos a indicar que el tipo es <RespuestaTopHeadlines> */
  private ejecutarQuery<T>(query: string)
  {
    var q =  apiUrl + query;
    
    return this.http.get<T>(q, {headers});
  }


  getTitulares()
  {

    this.headlinePage ++; /* aumento en 1 la pagina */

    /* en la interface definida tenemos el tipo rspuesta top, en la devolucion ya devolvemos ese tipo */
    /*return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=ar&apiKey=4d7feadcadb64cbf9cdcebc43b3e4cf8`);*/

    /* modularizo la llada a la api, reuso codigo y mando solo lo que cambia, dejo lo anterio de ejemplo */
   return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&page=${this.headlinePage}`);

  }

  getNoticiasPorCategoria(categoria)
  {

    if (this.categoriaActual === categoria)
    {
      this.categoriaPage++;
    } else {
      this.categoriaPage=1;
      this.categoriaActual = categoria;
    }

    /* como meto una vriable en el medio uso la comilla de costado  si uso la derecha no anda */
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=ar&category=${categoria}&page=${this.categoriaPage}`);

     /* en la interface definida tenemos el tipo rspuesta top, en la devolucion ya devolvemos ese tipo */
     //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=ar&category=&apiKey=4d7feadcadb64cbf9cdcebc43b3e4cf8`);
  }
}
