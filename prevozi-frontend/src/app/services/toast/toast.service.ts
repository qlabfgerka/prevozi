import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly duration = 5000;
  private readonly color = 'dark';

  constructor(private readonly toastController: ToastController) {}

  public async presentToast(message: string) {
    const toast = await this.toastController.create({
      color: this.color,
      duration: this.duration,
      message,
    });

    await toast.present();
  }
}
