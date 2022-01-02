import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent implements OnInit {
  @Input() sort: string;

  constructor(private readonly popoverController: PopoverController) {}

  ngOnInit() {}

  applyFilter(sort: string): void {
    this.sort = sort;
    this.popoverController.dismiss(sort);
  }
}
