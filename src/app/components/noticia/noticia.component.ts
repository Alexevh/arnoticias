import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
/* sto es un plugin de cordova para usar el browser del navegador */
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  //** necesito recibir la noticia */

  @Input() noticia: Article;
  @Input() indice: number = 0;
    /** voy a detectar si esta en favoritos */
    @Input() enFavoritos;
  
  constructor(private iab: InAppBrowser,
              private actionCtrl: ActionSheetController,
              private socialsharing: SocialSharing,
              private storage: DataLocalService){ }

  ngOnInit() {}

  /* podria recibir la url como argumento pero como tengo el input noticia lo agarro de ahi */
  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }


  
  async lanzarMenu()
  {

    let guardarBorrarBtn;

    if (this.enFavoritos)
    {
      guardarBorrarBtn = {
        text: 'Eliminar',
        icon: 'trash',
        /* como esto esta global no puedo hacer el css en el local, tengo que meterlo en el gloal.css */
        cssClass: 'action-dark',
        handler: () => {
          this.storage.borrarNoticia(this.noticia);
        }
      };
    } else 
    {
      guardarBorrarBtn= {
        text: 'Favoritos',
        icon: 'heart',
        /* como esto esta global no puedo hacer el css en el local, tengo que meterlo en el gloal.css */
        cssClass: 'action-dark',
        handler: () => {
          this.storage.guardarNoticia(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionCtrl.create({

      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialsharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
        }
      }, 
      guardarBorrarBtn,
       {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  }//fin

