import { Component, OnInit } from '@angular/core';

import {  NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StoreService } from '../../service/store-service';

import { ListModel } from '../../model/list';
import { ItemModel } from '../../model/item';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class Items implements OnInit {

  public input: string = '';
  public get list(): ListModel {
    return this.store.list;
  }
  public get filteredItems(): ItemModel[] {
    return this.store.filteredItems;
  }

  constructor(
    private store: StoreService,
    private navParams: NavParams,
    private alertCtrl: AlertController,
  ) {
    this.store.list = this.navParams.get('list');
    this.store.filteredItems = this.store.list.items;
  }

  public filterItems(value: string): void {
    this.input = value;
    this.store.updateFilteredItems(this.input);
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
          handler: data => this.store.saveItem(data.title, data.description),
        }
      ]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.store.initializeItemId();
  }
}
