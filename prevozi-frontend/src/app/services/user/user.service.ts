import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/app/models/city/city.model';
import { UserDTO } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getUser(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(`${this.hostname}/user`);
  }
}
