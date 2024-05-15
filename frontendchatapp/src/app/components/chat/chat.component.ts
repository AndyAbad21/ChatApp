import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service'; // Importar el servicio ChatService

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
 
  public message: string = ''; // Variable para almacenar el mensaje del usuario
  public messages: any = []; // Arreglo para almacenar los mensajes recibidos

  ngOnInit(): void {
    this.listMessages(); // Llamar al método listMessages() cuando el componente se inicializa
  }

  constructor(private chatService: ChatService) {} // Inyectar el servicio ChatService en el constructor

  // Método para enviar un mensaje al servidor
  public sendMessage() {
    this.chatService.sendMessage(this.message); // Llamar al método sendMessage() del servicio ChatService
    this.messages.push(this.message); // Agregar el mensaje enviado al arreglo de mensajes
    this.message = ''; // Limpiar el campo de entrada de mensajes
  }
  
  // Método para recibir mensajes del servidor
  public listMessages() {
    // Suscribirse al observable devuelto por el método listMessages() del servicio ChatService
    this.chatService.listMessages().subscribe((data: any) => {
      console.log(data); // Imprimir los datos recibidos en la consola
      this.messages.push(data.data); // Agregar el mensaje recibido al arreglo de mensajes
    });
  }
}
