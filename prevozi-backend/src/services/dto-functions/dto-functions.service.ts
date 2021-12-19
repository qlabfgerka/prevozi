import { Injectable } from '@nestjs/common';
import { CarBrand } from 'src/models/car/car.brand.model';
import { CarColor } from 'src/models/car/car.color.model';
import { CarDTO } from 'src/models/car/car.model';
import { City } from 'src/models/city/city.model';
import { Role } from 'src/models/role/role.model';
import { User } from 'src/models/user/user.model';

@Injectable()
export class DtoFunctionsService {
  public userToDTO(user: User): User {
    if (!user) return undefined;
    const userDTO: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      rating: user.rating,
      roles: this.rolesToDTO(user.roles),
    };

    return userDTO;
  }

  public roleToDTO(role: Role): Role {
    const roleDTO: Role = {
      id: role.id,
      value: role.value,
    };

    return roleDTO;
  }

  public rolesToDTO(roles: Array<Role>): Array<Role> {
    const rolesDTO = new Array<Role>();

    roles.forEach((role: Role) => {
      rolesDTO.push(this.roleToDTO(role));
    });

    return rolesDTO;
  }

  public cityToDTO(city: City): City {
    const cityDTO: City = {
      id: city.id,
      value: city.value,
    };

    return cityDTO;
  }

  public citiesToDTO(cities: Array<City>): Array<City> {
    const citiesDTO = new Array<City>();

    cities.forEach((city: City) => {
      citiesDTO.push(this.cityToDTO(city));
    });

    return citiesDTO;
  }

  public carBrandToDTO(brand: CarBrand): CarBrand {
    const carBrandDTO: CarBrand = {
      id: brand.id,
      value: brand.value,
      models: brand.models,
    };
    return carBrandDTO;
  }

  public carBrandsToDTO(brands: Array<CarBrand>): Array<CarBrand> {
    const carBrandsDTO = new Array<CarBrand>();

    brands.forEach((brand: CarBrand) => {
      carBrandsDTO.push(this.carBrandToDTO(brand));
    });

    return carBrandsDTO;
  }

  public carColorToDTO(color: CarColor): CarColor {
    const carColorDTO: CarColor = {
      id: color.id,
      value: color.value,
    };
    return carColorDTO;
  }

  public carColorsToDTO(colors: Array<CarColor>): Array<CarColor> {
    const carColorsDTO = new Array<CarColor>();

    colors.forEach((color: CarColor) => {
      carColorsDTO.push(this.carColorToDTO(color));
    });

    return carColorsDTO;
  }

  public carsToDTO(
    carBrands: Array<CarBrand>,
    carColors: Array<CarColor>,
  ): CarDTO {
    const carDTO: CarDTO = {
      brands: this.carBrandsToDTO(carBrands),
      colors: this.carColorsToDTO(carColors),
    };

    return carDTO;
  }
}
