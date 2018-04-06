import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListModel } from '../../model/list';
import { ItemModel } from '../../model/item';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class Items {

  private id: number = 0;
  private list: ListModel;
  public input: string = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage,
  ) {
    this.list = this.navParams.get('list');
  }

  public filterItems(value: string): void {
    this.input = value;
    // TODO: add filter
  }

  public openWindowToCreateItem(): void {
    let alert = this.alertCtrl.create({
      title: 'Create Item',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: data => {
            const item = new ItemModel(data.title, data.description, this.id++);
            this.list.items.push(item);
            this.storage.set(`${this.list.id}`, JSON.stringify(this.list));
          }
        }
      ]
    });
    alert.present();
  }
}
