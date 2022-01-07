import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confiration-dialog',
  templateUrl: './confiration-dialog.component.html',
  styleUrls: ['./confiration-dialog.component.scss'],
})
export class ConfirationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() content: string;
  @Input() confirmButton: string;
  @Input() cancelButton: string;

  constructor(private popoverController: PopoverController) {}

  ngOnInit(): void {}

  public buttonClick(data: string): void {
    this.popoverController.dismiss(data);
  }
}
