import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { CarBrandDTO, CarColorDTO } from 'src/app/models/car/car.model';
import { CityDTO } from 'src/app/models/city/city.model';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { CarService } from 'src/app/services/car/car.service';
import { CityService } from 'src/app/services/city/city.service';
import { RideService } from 'src/app/services/ride/ride.service';
import { TimeDialogComponent } from 'src/app/shared/components/dialogs/time-dialog/time-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public addRideForm: FormGroup;
  public error: string;
  public isLoading: boolean;
  public cars: Array<CarBrandDTO>;
  public colors: Array<CarColorDTO>;
  public cities: Array<CityDTO>;
  public ride: RideDTO;

  constructor(
    private readonly popoverController: PopoverController,
    private readonly formBuilder: FormBuilder,
    private readonly cityService: CityService,
    private readonly carService: CarService,
    private readonly rideService: RideService,
    private readonly router: Router
  ) {}

  public get errorControl() {
    return this.addRideForm.controls;
  }

  public get stops(): FormArray {
    return this.addRideForm.get('stops') as FormArray;
  }

  ngOnInit() {
    this.ride = new RideDTO();
    this.refresh();
    this.addRideForm = this.formBuilder.group({
      departure: [null, [Validators.required]],
      stops: this.formBuilder.array([['']], [Validators.required]),
      price: [10, [Validators.required]],
      spots: [3, [Validators.required]],
      luggage: [1, [Validators.required]],
      carBrand: ['', [Validators.required]],
      carModel: ['', [Validators.required]],
      carColor: ['', [Validators.required]],
      carRegistration: ['', [Validators.required]],
    });
  }

  public addRide(): void {
    if (
      this.addRideForm.valid &&
      this.ride.departureTime &&
      this.ride.arrivalTime
    ) {
      const brand: CarBrandDTO = {
        models: [this.addRideForm.get('carModel').value],
        value: this.addRideForm.get('carBrand').value,
      };
      this.ride.departure = this.addRideForm.get('departure').value;
      this.ride.stops = this.addRideForm.get('stops').value;
      this.ride.price = this.addRideForm.get('price').value;
      this.ride.spots = this.addRideForm.get('spots').value;
      this.ride.luggage = this.addRideForm.get('luggage').value;
      this.ride.carBrand = brand;
      this.ride.carColor = this.addRideForm.get('carColor').value;
      this.ride.carRegistration = this.addRideForm.get('carRegistration').value;
      this.ride.reservations = [];

      this.rideService
        .addRide(this.ride)
        .pipe(take(1))
        .subscribe((ride: RideDTO) => {
          this.router.navigate(['']);
        });
    }
  }

  public getModels(): Array<string> {
    return this.cars
      .find((car) => car.value === this.addRideForm.get('carBrand').value)
      .models.sort((a, b) => (a > b ? 1 : -1));
  }

  public addStop(): void {
    this.stops.push(this.formBuilder.control(''));
  }

  public async openDepartureTime(): Promise<void> {
    const popover = await this.popoverController.create({
      component: TimeDialogComponent,
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.ride.departureTime = data.data;
      }
    });
  }

  public async openArrivalTime(): Promise<void> {
    const popover = await this.popoverController.create({
      component: TimeDialogComponent,
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.ride.arrivalTime = data.data;
      }
    });
  }

  private refresh(): void {
    this.isLoading = true;
    forkJoin([this.cityService.getCities(), this.carService.getCars()])
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((result) => {
        this.cities = result[0].sort((a, b) => (a.value > b.value ? 1 : -1));
        this.cars = result[1].brands.sort((a, b) =>
          a.value > b.value ? 1 : -1
        );
        this.colors = result[1].colors;
      });
  }
}
