import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent implements OnInit {
  @Input() filter: string;

  constructor(private readonly popoverController: PopoverController) {}

  ngOnInit() {}

  applyFilter(filter: string): void {
    this.filter = filter;
    this.popoverController.dismiss(filter);
  }
}
