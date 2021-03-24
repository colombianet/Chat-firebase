import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje = '';
  contenedorMensajes: HTMLElement;

  constructor( public chatSvc: ChatService ) {
    this.chatSvc.getMessages().subscribe(resp => {
      // se situa al final del chat, cada que hay un nuevo mensaje
      setTimeout(() => {
        this.contenedorMensajes.scrollTop = this.contenedorMensajes.scrollHeight;
      }, 20);
    });
   }

  ngOnInit(): void {
    this.contenedorMensajes = document.getElementById('contenedorMensajes');
  }

  enviarMensaje() {
    if ( this.mensaje.length === 0 ) { return; }

    this.chatSvc.sendMessage( this.mensaje )
      .then(() => this.mensaje = '')
      .catch(err => console.log('Error al guardar mensaje', err));
  }

}
