import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { EventSocket, SERVER_URL } from './shared/socket.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private urlServerSocketIo: String;
  private connectionStatus: any;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.urlServerSocketIo = SERVER_URL;
    this.initSocketIoConnection();
    this.connectionStatus = {
      message: 'Tentando estabelecer conexão com o servidor Socket IO...',
      color: 'orange'
    }
  }

  private initSocketIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(EventSocket.CONNECT)
      .subscribe(() => {
        this.connectionStatus = {
          message: 'Conectado ao servidor Socket IO com sucesso!',
          color: 'green'
        }
      });

    this.socketService.onEvent(EventSocket.DISCONNECT)
      .subscribe(() => {
        this.connectionStatus = {
          message: 'Desconectado do servidor Socket IO.',
          color: 'red'
        }
      });

    this.socketService.onEvent(EventSocket.ERROR)
      .subscribe((error) => {
        this.connectionStatus = {
          message: 'Erro ao tentar estabelecer conexão com servidor Socket IO.',
          color: 'red'
        }
        console.log(error)
      });

    this.socketService.onEvent(EventSocket.RECONNECT)
      .subscribe((attemptNumber) => {
        this.connectionStatus = {
          message: 'Reconexão feita com sucesso!. Número de tentativas que foi realizada: ' + attemptNumber,
          color: 'green'
        }
      });

    this.socketService.onEvent(EventSocket.RECONNECTING)
      .subscribe(() => {
        this.connectionStatus = {
          message: 'Reconexão sendo realizada...',
          color: 'orange'
        }
      });

    this.socketService.onEvent(EventSocket.RECONNECT_FAILED)
      .subscribe(() => {
        this.connectionStatus = {
          message: 'Reconexão com o servidor Socket IO não foi possível: Número de tentativas: ',
          color: 'red'
        }
      });

      this.socketService.onEvent(EventSocket.RECONNECT_ERROR)
      .subscribe(() => {
        this.connectionStatus = {
          message: 'Erro durante reconexão com o servidor Socket IO ',
          color: 'red'
        }
      });
  }

  private messageColor(): Object {
    return { color: this.connectionStatus.color };
  }

}
