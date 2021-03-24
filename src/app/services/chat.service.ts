import { Injectable, QueryList } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { map } from 'rxjs/operators';

import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;
  chats: Message[] = [];
  usuario: { nombre: string, uid: string} = { nombre : '', uid : ''};

  constructor( private afs: AngularFirestore, public auth: AngularFireAuth ) {
    this.auth.authState.subscribe( user => {
      
      if ( !user ) {
        return;
      }
      
      // si se loguea un usuario, tomo los valores que me proveen y asi para cumplir mi modelo <Message>
      const { displayName, uid } = user;
      
      this.usuario.nombre = displayName;
      this.usuario.uid = uid;
    })
   }

  login( proveedor: string ) {
    if ( proveedor = 'google' ) {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // la siguiente parte es para loguarse con otro proveedor de cuentas como github, facebook, twitter...
    } else {
      
    }
  }

  async logout() {
    await this.auth.signOut();
  }

  getMessages() {
    // al obtener una coleccion en firebase, como 2do parametro puedo mandar Querys
    this.itemsCollection = this.afs.collection<Message>('chats', r => r.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges()
      .pipe(
        map(resp => {
          // en el query obtengo los ultimos 5 mensaje(fecha), entonces invierto el orden para ayuda a usuario
          resp.reverse();
          this.chats = resp;
        })
      );
  }

  sendMessage( mensaje: string ) {
    const { nombre, uid } = this.usuario;
    
    let message: Message = {
      nombre,
      mensaje,
      fecha: new Date().getTime(),
      uid
    }

    return this.itemsCollection.add( message );
  }
}
