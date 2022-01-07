import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss'],
})
export class RateDialogComponent implements OnInit {
  @Input() username: string;

  public ratedQuality: Array<boolean> = [false, false, false, false, false];
  public ratedPunctuality: Array<boolean> = [false, false, false, false, false];

  constructor(private readonly popoverController: PopoverController) {}

  ngOnInit(): void {}

  public get disabled(): boolean {
    return (
      this.ratedQuality.find((value: boolean) => value) === undefined ||
      this.ratedPunctuality.find((value: boolean) => value) === undefined
    );
  }

  public qualityClick(index: number): void {
    for (let i = 0; i < 5; i++) {
      if (i <= index) this.ratedQuality[i] = true;
      else this.ratedQuality[i] = false;
    }
  }

  public punctualityClick(index: number): void {
    for (let i = 0; i < 5; i++) {
      if (i <= index) this.ratedPunctuality[i] = true;
      else this.ratedPunctuality[i] = false;
    }
  }

  public rate(): void {
    this.popoverController.dismiss([
      this.getValue(this.ratedQuality),
      this.getValue(this.ratedPunctuality),
    ]);
  }

  private getValue(array: Array<boolean>): number {
    return array.filter((value: boolean) => value).length;
  }
}
