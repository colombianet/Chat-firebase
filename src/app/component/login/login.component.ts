import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( public chatSvc: ChatService ) { }

  ngOnInit(): void {
  }

  // el proveedor es para loguear con otras cuentas como twitter, guthub...
  // pero no pude crear app de twitter por eso siempre loguea con google
  entrar( proveedor: string ) {
    this.chatSvc.login( proveedor );
  }

}
