import { Component, OnInit } from '@angular/core';
import { AlertController, ViewController , NavParams } from 'ionic-angular';

import { ItemModel } from '../../model/item';
import { ItemsService } from '../../service/items-service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage implements OnInit {

  public item: ItemModel;
  
  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private itemService: ItemsService,
  ) {
  }
  
  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  public openEditWindow(): void {
    let alert = this.alertCtrl.create({
      title: `Editor to ${this.item.title}`,
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: this.item.title,
        },
        {
          name: 'description',
          placeholder: 'Description',
          value: this.item.description,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Edit',
          handler: data => this.itemService.editItem(data.title, data.description, this.item.id),
        }
      ]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.item = this.params.get('item');
  }
}
