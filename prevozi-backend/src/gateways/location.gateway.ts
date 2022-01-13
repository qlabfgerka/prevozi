import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from 'src/services/socket/socket.service';

@WebSocketGateway({ cors: true })
export class LocationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server): void {
    this.socketService.server = server;
    this.socketService.clients = new Array<{
      client: Socket;
      id: string;
    }>();
  }

  handleConnection(client: any): void {
    console.log(`${client.id} connected`);
  }

  handleDisconnect(client: any): void {
    const index = this.socketService.clients.indexOf(
      this.socketService.clients.find(
        (currentClient) => currentClient.client.id === client.id,
      ),
    );

    if (index > -1) {
      this.socketService.clients[index].client.leave(
        this.socketService.clients[index].id,
      );
      this.socketService.clients.splice(index, 1);
    }
  }

  @SubscribeMessage('joinRoom')
  public handleJoinRoom(client: Socket, data: { id: string }): void {
    this.socketService.clients.push({
      id: data.id,
      client: client,
    });

    client.join(data.id);
    client.emit('joinedRoom', data.id);
  }

  @SubscribeMessage('leaveRoom')
  public handleLeaveRoom(client: Socket, id: string): void {
    const index = this.socketService.clients.indexOf(
      this.socketService.clients.find(
        (currentClient) =>
          currentClient.id === id && currentClient.client.id === client.id,
      ),
    );

    if (index > -1) this.socketService.clients.splice(index, 1);

    client.leave(id);
    client.emit('leftRoom', id);
  }

  @SubscribeMessage('location')
  handleMessage(
    client: any,
    data: { id: string; lat: number; lon: number },
  ): void {
    this.socketService.server
      .to(data.id)
      .emit('getLocation', { lat: data.lat, lon: data.lon });
  }
}
