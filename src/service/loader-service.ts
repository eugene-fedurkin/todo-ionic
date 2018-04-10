import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderService {

  private loaderRequest: number = 0;
  private loader: any;

  constructor(private loadingCtrl: LoadingController) {}

  public showLoader(): void {
    if (!this.loaderRequest) {
      this.loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loader.present();
    }
    this.loaderRequest++;
  }

  public hideLoader(): void {
    if (this.loaderRequest) {
      this.loaderRequest--;
    }
    if (!this.loaderRequest) {
      this.loader.dismiss();
      return;
    };
  }
}