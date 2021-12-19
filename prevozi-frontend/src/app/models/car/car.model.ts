export class CarBrandDTO {
  id?: string | undefined | null = null;
  value: string | undefined | null = null;
  models: Array<string> | undefined | null = null;
}

export class CarColorDTO {
  id?: string | undefined | null = null;
  value: string | undefined | null = null;
}

export class CarWrapperDTO {
  brands: CarBrandDTO | undefined | null = null;
  colors: CarColorDTO | undefined | null = null;
}
