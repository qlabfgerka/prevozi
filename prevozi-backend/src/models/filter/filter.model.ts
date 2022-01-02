import { City } from '../city/city.model';

export class Filter {
  start: City | undefined | null = null;
  end: City | undefined | null = null;
  startTime: Date | undefined | null = null;
  endTime: Date | undefined | null = null;
  price: number | undefined | null = null;
}
