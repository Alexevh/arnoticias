import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Article } from "../interfaces/interfaces";
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    /* si hay una noticia con el mismo titulo no la guardo */
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      /* unshift la pone al principio del arreglo */
      this.noticias.unshift(noticia);
      this.storage.set("favoritos", this.noticias);
      this.mostrarToast('la noticia se agrego a favoritos');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get("favoritos");

    if (favoritos) {
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }
  }

  borrarNoticia(noticia: Article) {
    
    /* podria bien recorrer el arreglo pero uso esta funcion de JS */
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.mostrarToast('la noticia se borro de favoritos');
  }

  async mostrarToast(mensaje: string)
  {
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 2500,
        position: 'top'
      }
    );
    toast.present();
  }
}
