import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../../../api/src/interface/user";

import { SocketService } from './shared/services/socket.service';
import { EventSocket, SERVER_URL_SOCKETIO, SERVER_URL_API } from './shared/const-commons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private urlServerSocketIo: String;
  private connectionStatus: any;
  private users: IUser[];

  constructor(private socketService: SocketService, private http: HttpClient) { }

  ngOnInit(): void {
    this.urlServerSocketIo = SERVER_URL_SOCKETIO;
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

  private getAllUsers(): any {
    this.http.get(SERVER_URL_API + 'users').subscribe((usersJson) => {
      this.users = usersJson as IUser[];
    })
  }

  private deleteUserById(id: number): any {
    this.http.delete(SERVER_URL_API + 'users/' + id).subscribe((res) => {
      console.log(res);
      this.users = this.users.filter((user) => user._id !== id)
    })
  }

}
