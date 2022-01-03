import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { FilterDTO } from 'src/app/models/filter/filter.model';
import { ReservationDTO } from 'src/app/models/reservation/reservation.model';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { ConfirationDialogComponent } from '../dialogs/confiration-dialog/confiration-dialog.component';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss'],
})
export class RideComponent implements OnInit {
  @Input() ride: RideDTO;
  @Input() filters: FilterDTO;
  @Output() bookEvent = new EventEmitter<void>();

  public username: string;

  constructor(
    private readonly authService: AuthService,
    private readonly rideService: RideService,
    private readonly popoverController: PopoverController
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public canBook(ride: RideDTO): boolean {
    return (
      this.myBooking(ride) ||
      ride.spots - ride.reservations.length <= 0 ||
      this.userBooked(ride)
    );
  }

  public userBooked(ride: RideDTO): boolean {
    return (
      ride.reservations.find(
        (reservation: ReservationDTO) =>
          reservation.user.username === this.username
      ) !== undefined
    );
  }

  public myBooking(ride: RideDTO): boolean {
    return this.username === ride.owner.username;
  }

  public async bookRide(ride: RideDTO): Promise<void> {
    const datePipe: DatePipe = new DatePipe('en-GB');
    const popover = await this.popoverController.create({
      component: ConfirationDialogComponent,
      cssClass: 'popover-box',
      componentProps: {
        title: `Book Ride`,
        subtitle: `Book a ride with ${ride.owner.username}`,
        content: `Are you sure you want to book a ride with ${
          ride.owner.username
        }, which goes from ${ride.departure.value} to ${
          ride.stops[ride.stops.length - 1].value
        } at ${datePipe.transform(
          ride.departureTime,
          'dd-MMM-YYYY HH:mm:ss'
        )} and arrives at ${datePipe.transform(
          ride.arrivalTime,
          'dd-MMM-YYYY HH:mm:ss'
        )}`,
        confirmButton: 'BOOK',
        cancelButton: 'CANCEL',
      },
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data && data.data === 'BOOK') {
        this.rideService
          .bookRide(ride.id)
          .pipe(take(1))
          .subscribe((ride: RideDTO) => this.bookEvent.emit());
      }
    });
  }

  private refresh(): void {
    this.authService
      .getUsername()
      .pipe(take(1))
      .subscribe((username: string) => (this.username = username));
  }
}
