import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ReservationDTO } from 'src/app/models/reservation/reservation.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { RideService } from 'src/app/services/ride/ride.service';
import { UserService } from 'src/app/services/user/user.service';
import { RateDialogComponent } from '../dialogs/rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  @Input() reservations: Array<ReservationDTO>;
  @Input() rideId: string;
  @Input() end: Date;

  constructor(
    private readonly rideService: RideService,
    private readonly userService: UserService,
    private readonly popoverController: PopoverController
  ) {}

  ngOnInit(): void {}

  public expired(): boolean {
    return new Date() > new Date(this.end);
  }

  public confirmed(reservation: ReservationDTO): boolean {
    return reservation.confirmed;
  }

  public pickedUp(reservation: ReservationDTO): boolean {
    return reservation.pickedUp;
  }

  public accept(reservation: ReservationDTO): void {
    this.rideService
      .acceptReservation(reservation, this.rideId)
      .pipe(take(1))
      .subscribe(
        (reservations: Array<ReservationDTO>) =>
          (this.reservations = reservations)
      );
  }

  public remove(reservation: ReservationDTO): void {
    this.rideService
      .removeReservation(reservation, this.rideId)
      .pipe(take(1))
      .subscribe(
        (reservations: Array<ReservationDTO>) =>
          (this.reservations = reservations)
      );
  }

  public markPickedUp(userId: string): void {
    this.rideService
      .markPickedUp(userId, this.rideId)
      .pipe(take(1))
      .subscribe(
        (reservations: Array<ReservationDTO>) =>
          (this.reservations = reservations)
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
}
