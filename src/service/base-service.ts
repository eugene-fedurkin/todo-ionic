import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

@Injectable()
export class BaseService {

  constructor(protected toastCtrl: ToastController) {}

  protected showNitification(message: string, duration: number = 3000) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
    });
    toast.present();
  }
}
