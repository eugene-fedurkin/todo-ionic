import { Component, OnInit } from '@angular/core';

import {  NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ListModel } from '../../model/list';
import { ItemModel } from '../../model/item';
import { CashService } from '../../service/cash-service';
import { ItemsService } from '../../service/items-service';

@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class Items implements OnInit {

  public input: string = '';
  public get list(): ListModel {
    return this.cash.list;
  }
  public get filteredItems(): ItemModel[] {
    return this.cash.filteredItems;
  }

  constructor(
    private cash: CashService,
    private itemService: ItemsService,
    private navParams: NavParams,
    private alertCtrl: AlertController,
  ) {
    this.cash.list = this.navParams.get('list');
    this.cash.filteredItems = this.cash.list.items;
  }

  public filterItems(value: string): void {
    this.cash.filterToInputOfItem = value;
    this.itemService.updateFilteredItems();
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
          handler: data => this.itemService.saveItem(data.title, data.description),
        }
      ]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.itemService.initializeItemId();
  }
}
