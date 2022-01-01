import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-time-dialog',
  templateUrl: './time-dialog.component.html',
  styleUrls: ['./time-dialog.component.scss'],
})
export class TimeDialogComponent implements OnInit {
  public date: string;

  constructor(private readonly popoverController: PopoverController) {}

  ngOnInit() {
    this.date = new Date().toISOString();
  }

  public close(): void {
    this.popoverController.dismiss(this.date);
  }
}
