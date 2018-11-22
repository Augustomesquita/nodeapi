import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';
import { EventSocket, SERVER_URL_SOCKETIO } from '../const-commons';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL_SOCKETIO);
  }

  public onEvent(event: EventSocket): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  public sendMessage(event: EventSocket, data: any) {
    this.socket.emit(event, JSON.stringify(data));
  }
}