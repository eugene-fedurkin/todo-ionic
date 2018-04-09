import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

import { StoreService } from '../../service/store-service';

import { ItemModel } from '../../model/item';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'item',
  templateUrl: 'item.html',
})
export class Item {

  @Input('item')
  public item: ItemModel;
  
  constructor(
    private store: StoreService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  public openItem(item: ItemModel): void {
    const profileModal = this.modalCtrl.create(ItemDetailsPage, { item });
    profileModal.present();
  }

  public deleteItem(event: Event, item: ItemModel): void {
    event.stopPropagation();
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Do you want to remove "${item.title}" item?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Remove',
          handler: () => this.store.removeItem(item.id),
        }
      ]
    });
    alert.present();
  }
}
