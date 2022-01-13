import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { forkJoin } from 'rxjs';

declare var H: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit, AfterViewInit {
  @ViewChild('map') public mapElement: ElementRef;
  public ride: RideDTO;
  public isLoading: boolean;
  public map: any;
  public interval: ReturnType<typeof setInterval>;
  public username: string;

  constructor(
    private readonly rideService: RideService,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.isLoading = true;
    this.initMap();

    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.printCurrentPosition();
      this.isLoading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.isLoading = true;
    this.route.paramMap
      .pipe(
        take(1),
        mergeMap((paramMap) =>
          forkJoin([this.rideService.getRide(paramMap.get('id')).pipe(take(1)), this.authService
          .getUsername()
          .pipe(take(1))])
        )
      )
      .subscribe((response) => {
        this.ride = response[0];
        this.username = response[1];
        this.isLoading = false;
      });
  }

  private async printCurrentPosition(): Promise<void> {
    const coordinates = await Geolocation.getCurrentPosition();

    let marker = new H.map.Marker({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });

    if (this.map) {
      this.map.addObject(marker);
      this.map.setCenter({
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      });
    }
  }

  private initMap(): void {
    setTimeout(() => {
      var platform = new H.service.Platform({
        apikey: '',
      });

      // Obtain the default map types from the platform object
      var maptypes = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(
        this.mapElement.nativeElement,
        maptypes.vector.normal.map,
        {
          zoom: 10,
          center: { lng: 0, lat: 0 },
        }
      );

      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      let behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(this.map)
      );
    }, 50);
  }
}
