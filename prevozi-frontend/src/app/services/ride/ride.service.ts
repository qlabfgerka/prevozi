import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDTO } from 'src/app/models/filter/filter.model';
import { RideDTO } from 'src/app/models/ride/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private readonly hostname: string = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  public getRides(filter: FilterDTO): Observable<Array<RideDTO>> {
    return this.httpClient.post<Array<RideDTO>>(`${this.hostname}/ride/all`, {
      filter,
    });
  }

  public addRide(ride: RideDTO): Observable<RideDTO> {
    return this.httpClient.post<RideDTO>(`${this.hostname}/ride`, ride);
  }

  public bookRide(id: string): Observable<RideDTO> {
    return this.httpClient.patch<RideDTO>(`${this.hostname}/ride/${id}`, {});
  }

  public getMyRides(): Observable<Array<RideDTO>> {
    return this.httpClient.get<Array<RideDTO>>(`${this.hostname}/ride`);
  }
}
