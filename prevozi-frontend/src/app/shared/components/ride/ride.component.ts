import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { FilterDTO } from 'src/app/models/filter/filter.model';
import { ReservationDTO } from 'src/app/models/reservation/reservation.model';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { RideService } from 'src/app/services/ride/ride.service';
import { AuthService } from 'src/app/services/user/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirationDialogComponent } from '../dialogs/confiration-dialog/confiration-dialog.component';
import { RateDialogComponent } from '../dialogs/rate-dialog/rate-dialog.component';

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
    private readonly userService: UserService,
    private readonly popoverController: PopoverController,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  public round(num: number): number {
    return Math.round(num);
  }

  public confirmed(ride: RideDTO): number {
    return ride.reservations.filter(
      (reservation: ReservationDTO) => reservation.confirmed
    ).length;
  }

  public canBook(ride: RideDTO): boolean {
    return this.myBooking(ride) || this.full(ride) || this.userBooked(ride);
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

  public full(ride: RideDTO): boolean {
    return ride.spots - this.confirmed(ride) <= 0;
  }

  public expired(ride: RideDTO): boolean {
    return new Date() > new Date(ride.arrivalTime);
  }

  public openDetails(ride: RideDTO): void {
    this.router.navigate([`/rides/${ride.id}`]);
  }

  public cancelBooking(ride: RideDTO): void {
    const reservation = ride.reservations.find(
      (reservation: ReservationDTO) =>
        reservation.user.username === this.username
    );
    this.rideService
      .removeReservation(reservation, this.ride.id)
      .pipe(take(1))
      .subscribe(
        (reservations: Array<ReservationDTO>) =>
          (this.ride.reservations = reservations)
      );
  }

  public async rate(user: UserDTO): Promise<void> {
    const popover = await this.popoverController.create({
      component: RateDialogComponent,
      componentProps: {
        username: user.username,
      },
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.userService
          .rateUser(user.id, [data.data[0], data.data[1]])
          .pipe(take(1))
          .subscribe(() => {});
      }
    });
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
