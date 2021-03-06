import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SocketService } from './shared/services/socket.service';
import { EventSocket, SERVER_URL_SOCKETIO, SERVER_URL_API } from './shared/const-commons';
import { IUserModel } from './../../../api/src/model/user'
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  private urlServerSocketIo: String;
  private urlServerApi: String;

  private connectionSocketIoStatus: any;
  private connectionApiStatus: any;

  private users: MatTableDataSource<IUserModel>;
  private columnsToDisplay: String[];

  constructor(private socketService: SocketService, private http: HttpClient, public toastr: ToastrManager, vcr: ViewContainerRef) { }

  ngOnInit(): void {
    this.urlServerSocketIo = SERVER_URL_SOCKETIO;
    this.urlServerApi = SERVER_URL_API;

    this.initSocketIoConnection();
    this.getAllUsersFromAPI();

    this.connectionSocketIoStatus = {
      message: 'Tentando estabelecer conexão com o servidor Socket IO...',
      color: 'orange'
    }

    this.connectionApiStatus = {
      message: 'Conexão com API inativa.',
      color: 'red'
    }

    this.columnsToDisplay = ['firstName', 'lastName', 'email', 'delete']

  }

  private initSocketIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(EventSocket.CONNECT)
      .subscribe(() => {
        this.connectionSocketIoStatus = {
          message: 'Conectado ao servidor Socket IO com sucesso!',
          color: 'green'
        }
      });

    this.socketService.onEvent(EventSocket.DISCONNECT)
      .subscribe(() => {
        this.connectionSocketIoStatus = {
          message: 'Desconectado do servidor Socket IO.',
          color: 'red'
        }
      });

    this.socketService.onEvent(EventSocket.ERROR)
      .subscribe((error) => {
        this.connectionSocketIoStatus = {
          message: 'Erro ao tentar estabelecer conexão com servidor Socket IO.',
          color: 'red'
        }
        console.log(error)
      });

    this.socketService.onEvent(EventSocket.RECONNECT)
      .subscribe((attemptNumber) => {
        this.connectionSocketIoStatus = {
          message: 'Reconexão feita com sucesso!. Número de tentativas que foi realizada: ' + attemptNumber,
          color: 'green'
        }
      });

    this.socketService.onEvent(EventSocket.RECONNECTING)
      .subscribe(() => {
        this.connectionSocketIoStatus = {
          message: 'Reconexão sendo realizada...',
          color: 'orange'
        }
      });

    this.socketService.onEvent(EventSocket.RECONNECT_FAILED)
      .subscribe(() => {
        this.connectionSocketIoStatus = {
          message: 'Reconexão com o servidor Socket IO não foi possível: Número de tentativas: ',
          color: 'red'
        }
      });

    this.socketService.onEvent(EventSocket.RECONNECT_ERROR)
      .subscribe(() => {
        this.connectionSocketIoStatus = {
          message: 'Erro durante reconexão com o servidor Socket IO ',
          color: 'red'
        }
      });

    this.socketService.onEvent(EventSocket.MESSAGE)
      .subscribe((message) => {
        console.log(message);
        this.toastr.successToastr(message.message, "Nova mensagem!");
      });
  }

  private messageSocketIoStatusColor(): Object {
    return { color: this.connectionSocketIoStatus.color };
  }

  private sendTesteMessage() {
    this.socketService.sendMessage(EventSocket.MESSAGE, { message: "teste" });
  }

  private messageApiStatusColor(): Object {
    return { color: this.connectionApiStatus.color };
  }

  private getAllUsersFromAPI(): any {
    this.http.get(SERVER_URL_API + 'users').subscribe(
      (usersJson) => {
        this.users = new MatTableDataSource(usersJson as IUserModel[]);
        this.connectionApiStatus = {
          message: 'Conexão com API ativa.',
          color: 'green'
        }
      }, (error) => {
        console.log(error);

        this.connectionApiStatus = {
          message: 'Conexão com API inativa.',
          color: 'red'
        }
      });
  }

  private deleteUserByIdFromAPI(id: number): any {
    this.http.delete(SERVER_URL_API + 'users/' + id).subscribe((res) => {
      if (res) {

        this.users = new MatTableDataSource(this.users.data.filter((user) => user._id !== id));
        this.connectionApiStatus = {
          message: 'Conexão com API ativa.',
          color: 'green'
        }
      }
    }, (error) => {
      console.log(error);

      this.connectionSocketIoStatus = {
        message: 'Desconectado do servidor Socket IO.',
        color: 'red'
      }
    });
  }

}
