import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { finalize, take } from 'rxjs/operators';
import { CityDTO } from 'src/app/models/city/city.model';
import { FilterDTO } from 'src/app/models/filter/filter.model';
import { RideDTO } from 'src/app/models/ride/ride.model';
import { CityService } from 'src/app/services/city/city.service';
import { TimeDialogComponent } from '../dialogs/time-dialog/time-dialog.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<FilterDTO>();
  @Input() filterDTO: FilterDTO;

  public filterForm: FormGroup;
  public isLoading: boolean;
  public cities: Array<CityDTO>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cityService: CityService,
    private readonly popoverController: PopoverController
  ) {}

  public get errorControl() {
    return this.filterForm.controls;
  }

  ngOnInit(): void {
    this.refresh();

    this.filterForm = this.formBuilder.group({
      departure: ['', []],
      arrival: ['', []],
      price: ['', []],
    });
  }

  public reset(): void {
    this.filterDTO = new FilterDTO();
    this.filterForm.reset();
    this.filterEvent.emit(this.filterDTO);
  }

  public filter(): void {
    this.filterDTO.start = this.filterForm.get('departure').value;
    this.filterDTO.end = this.filterForm.get('arrival').value;
    this.filterDTO.price = this.filterForm.get('price').value;
    this.filterEvent.emit(this.filterDTO);
  }

  public async openDepartureTime(): Promise<void> {
    const popover = await this.popoverController.create({
      component: TimeDialogComponent,
    });

    popover.present();

    popover.onDidDismiss().then((data) => {
      if (data) {
        this.filterDTO.startTime = new Date(data.data);
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
        this.filterDTO.endTime = new Date(data.data);
      }
    });
  }

  private refresh(): void {
    this.isLoading = true;

    this.cityService
      .getCities()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((cities: Array<CityDTO>) => {
        this.cities = cities.sort((a, b) => (a.value > b.value ? 1 : -1));
      });
  }
}
