import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  public joinRoom(id: string): void {
    this.socket.emit('joinRoom', { id });
  }

  public leaveRoom(id: string): void {
    this.socket.emit('leaveRoom', id);
  }

  public sendLocation(id: string, lat: number, lon: number): void {
    this.socket.emit('location', { id, lat, lon });
  }

  public stopListening(): void {
    this.socket.off('getLocation');
  }
}
