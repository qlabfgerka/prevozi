import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { RideService } from 'src/app/services/ride/ride.service';
import { MenuDialogComponent } from 'src/app/shared/components/dialogs/menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {
  public isLoading: boolean;
  public rides: Array<RideDTO>;
  public filter = 'ad';

  constructor(
    private readonly router: Router,
    private readonly rideService: RideService,
    private readonly popoverController: PopoverController
  ) {}

  ionViewWillEnter(): void {
    this.refresh();
  }

  ngOnInit(): void {}

  public navigateAddRide(): void {
    this.router.navigate(['/add']);
  }

  public openProfile(): void {
    this.router.navigate([`/profile`]);
  }

  public openRide(id: string): void {
    this.router.navigate([`/rides/${id}`]);
  }

  public async openMenu(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: MenuDialogComponent,
      event: ev,
      componentProps: {
        filter: this.filter,
      },
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.filter = data.data;
        this.sort();
      }
    });
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
        this.sort();
      });
  }

  private sort(): void {
    switch (this.filter) {
      case 'ad':
        this.rides.sort((a, b) => (a.arrivalTime < b.arrivalTime ? 1 : -1));
        break;
      case 'aa':
        this.rides.sort((a, b) => (a.arrivalTime > b.arrivalTime ? 1 : -1));
        break;
      case 'pd':
        this.rides.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
      case 'pa':
        this.rides.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
    }
  }
}
