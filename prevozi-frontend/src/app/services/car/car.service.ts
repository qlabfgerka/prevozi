import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarWrapperDTO } from 'src/app/models/car/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getCars(): Observable<CarWrapperDTO> {
    return this.httpClient.get<CarWrapperDTO>(`${this.hostname}/car`);
  }
}
