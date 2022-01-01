import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  public isLoading: boolean;
  public rides: Array<RideDTO>;

  constructor(
    private readonly router: Router,
    private readonly rideService: RideService
  ) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  ngOnInit(): void {}

  public navigateAddRide(): void {
    this.router.navigate(['/add']);
  }

  private refresh(): void {
    this.isLoading = true;
    this.rideService
      .getRides()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((rides: Array<RideDTO>) => {
        this.rides = rides;
      });
  }
}
