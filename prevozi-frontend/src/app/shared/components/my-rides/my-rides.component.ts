import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.scss'],
})
export class MyRidesComponent implements OnInit {
  public rides: Array<RideDTO>;
  public isLoading: boolean;

  constructor(private readonly rideService: RideService) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.isLoading = true;
    this.rideService
      .getMyRides()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((rides: Array<RideDTO>) => (this.rides = rides));
  }
}
