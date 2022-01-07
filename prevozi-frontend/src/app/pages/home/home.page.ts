import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';
import { FilterDTO } from 'src/app/models/filter/filter.model';
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
  public sort = 'aa';
  public filters: FilterDTO;

  constructor(
    private readonly router: Router,
    private readonly rideService: RideService,
    private readonly popoverController: PopoverController
  ) {}

  ionViewWillEnter(): void {
    this.filters = new FilterDTO();
    this.refresh();
  }

  ngOnInit(): void {}

  public filter(filter: FilterDTO): void {
    this.filters = filter;
    this.refresh();
  }

  public navigateAddRide(): void {
    this.router.navigate(['/add']);
  }

  public openProfile(): void {
    this.router.navigate([`/profile`]);
  }

  public onBookEvent(): void {
    this.refresh();
  }

  public async openMenu(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: MenuDialogComponent,
      event: ev,
      componentProps: {
        sort: this.sort,
      },
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.sort = data.data;
        this.sortRides();
      }
    });
  }

  private refresh(): void {
    this.isLoading = true;
    this.rideService
      .getRides(this.filters)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((rides: Array<RideDTO>) => {
        this.rides = rides;
        this.sortRides();
      });
  }

  private sortRides(): void {
    switch (this.sort) {
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
      case 'sd':
        this.rides.sort((a, b) => (a.departureTime < b.departureTime ? 1 : -1));
        break;
      case 'sa':
        this.rides.sort((a, b) => (a.departureTime > b.departureTime ? 1 : -1));
        break;
    }
  }
}
