import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { IonicModule } from '@ionic/angular';

/* en declarartions tengo que poner los componentes nuevos, lo deberia hacer automaticamente pero a veces da error */

@NgModule({
  declarations: [NoticiasComponent, NoticiaComponent],
  imports: [
    CommonModule,
    /**tengo que importar el IONICModule para que sepa de ionic ya que esto es angular*/
    IonicModule
  ], exports: [
    /* como tengo que usar esto en otras partes lo exporto, como noticias en plurar tiene dentro un noticia entonces
    no tengo por que exportar a,mbos pero lo usual es que si exporto ambos */
    NoticiasComponent,
  ]
})
export class ComponentsModule { }
