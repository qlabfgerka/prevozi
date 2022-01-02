import { CityDTO } from '../city/city.model';

export class FilterDTO {
  start: CityDTO | undefined | null = null;
  end: CityDTO | undefined | null = null;
  startTime: Date | undefined | null = null;
  endTime: Date | undefined | null = null;
  price: number | undefined | null = null;
}
