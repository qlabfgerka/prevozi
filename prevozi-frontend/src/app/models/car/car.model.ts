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
  brands: Array<CarBrandDTO> | undefined | null = null;
  colors: Array<CarColorDTO> | undefined | null = null;
}
