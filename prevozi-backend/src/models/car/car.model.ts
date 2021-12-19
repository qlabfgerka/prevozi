import { CarBrand } from './car.brand.model';
import { CarColor } from './car.color.model';

export class CarDTO {
  brands: Array<CarBrand> | undefined | null = null;
  colors: Array<CarColor> | undefined | null = null;
}
