import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideDTO } from 'src/app/models/ride/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getRides(): Observable<Array<RideDTO>> {
    return this.httpClient.get<Array<RideDTO>>(`${this.hostname}/ride`);
  }

  public addRide(ride: RideDTO): Observable<RideDTO> {
    return this.httpClient.post<RideDTO>(`${this.hostname}/ride`, ride);
  }
}
