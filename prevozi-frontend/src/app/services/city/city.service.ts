import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from 'src/app/models/city/city.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getCities(): Observable<Array<CityDTO>> {
    return this.httpClient.get<Array<CityDTO>>(`${this.hostname}/city`);
  }
}
