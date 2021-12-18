import { CarBrandDTO, CarColorDTO, CarModelDTO } from '../car/car.model';
import { CityDTO } from '../city/city.model';
import { ReservationDTO } from '../reservation/reservation.model';

export class RideDTO {
  id?: string | undefined | null = null;
  departure: CityDTO | undefined | null = null;
  departureTime: number | undefined | null = null;
  stops: Array<CityDTO> | undefined | null = null;
  arrivalTime: number | undefined | null = null;
  price: number | undefined | null = null;
  spots: number | undefined | null = null;
  luggage: number | undefined | null = null;
  carBrand: CarBrandDTO | undefined | null = null;
  carModel: CarModelDTO | undefined | null = null;
  carColor: CarColorDTO | undefined | null = null;
  carRegistration: string | undefined | null = null;
  reservations: Array<ReservationDTO> | undefined | null = null;
}
