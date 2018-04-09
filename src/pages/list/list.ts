import { Component, Input } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Items } from '../items/items';
import { ListModel } from '../../model/list';
import { StoreService } from '../../service/store-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class List {

  // private items: any = Items // TODO: change type

  @Input('list')
  public list: ListModel;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private store: StoreService,
  ) {}

  public select(list: ListModel): void {
    this.navCtrl.push(Items, { list });
  }

  public deleteList(event: Event, list: ListModel): void {
    event.stopPropagation();
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Do you want to remove "${list.title}" list?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Remove',
          handler: () => this.store.removeList(list.id),
        }
      ]
    });
    alert.present();
  }
}
