import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDTO } from 'src/app/models/filter/filter.model';
import { ReservationDTO } from 'src/app/models/reservation/reservation.model';
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

  public getRide(id: string): Observable<RideDTO> {
    return this.httpClient.get<RideDTO>(`${this.hostname}/ride/${id}`);
  }

  public acceptReservation(
    reservation: ReservationDTO,
    id: string
  ): Observable<Array<ReservationDTO>> {
    return this.httpClient.patch<Array<ReservationDTO>>(
      `${this.hostname}/ride/reservation/${id}`,
      { reservation }
    );
  }

  public removeReservation(
    reservation: ReservationDTO,
    id: string
  ): Observable<Array<ReservationDTO>> {
    return this.httpClient.delete<Array<ReservationDTO>>(
      `${this.hostname}/ride/reservation/${id}`,
      { body: { reservation } }
    );
  }

  public markPickedUp(
    userId: string,
    rideId: string
  ): Observable<Array<ReservationDTO>> {
    return this.httpClient.patch<Array<ReservationDTO>>(
      `${this.hostname}/ride/pickup/${rideId}/${userId}`,
      {}
    );
  }
}
