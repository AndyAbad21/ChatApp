import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; // Importar la clase Socket de ngx-socket-io
import { map } from 'rxjs'; // Importar la función map de rxjs para manipular los datos

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { } // Inyectar el servicio Socket en el constructor

  // Método para enviar un mensaje al servidor
  public sendMessage(message: string) {
    this.socket.emit('message', message); // Emitir el evento 'message' con el mensaje proporcionado
  }
  
  // Método para recibir mensajes del servidor
  public listMessages() {
    // Utilizar el método fromEvent() para suscribirse a eventos del servidor
    // y el operador pipe() junto con el operador map() para transformar los datos
    return this.socket.fromEvent('received').pipe(
      map((data) => data) // Mapear los datos recibidos y devolverlos
    );
  }
}
