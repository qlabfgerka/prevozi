import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  public ride: RideDTO;
  public isLoading: boolean;

  constructor(
    private readonly rideService: RideService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          this.rideService.getRide(paramMap.get('id')).pipe(take(1))
        )
      )
      .subscribe((ride: RideDTO) => {
        this.ride = ride;
        this.isLoading = false;
      });
  }
}
