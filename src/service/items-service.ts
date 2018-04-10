import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { ItemModel } from '../model/item';

import { CashService } from './cash-service';
import { HttpService } from './http-service';
import { BaseService } from './base-service';

@Injectable()
export class ItemsService extends BaseService {

  constructor(
    private http: HttpService,
    private cash: CashService,
    private storage: Storage,
    protected toastCtrl: ToastController,
  ) {
    super(toastCtrl);
  }

  public saveItem(title: string, description: string): void {
    if (!this.cash.list.items) this.cash.list.items = [];

    const item = new ItemModel(title, description, ++this.cash.itemId, this.cash.list.id);

    this.cash.list.items.push(item);
    this.updateFilteredItems();
    this.http.setList(this.cash.list.id, this.cash.list);
    this.storage.set('itemId', this.cash.itemId);
    this.storage.set(`${this.cash.list.id}`, JSON.stringify(this.cash.list));

    this.showNitification('The item was saved');
  }

  public updateFilteredItems(): void {
    this.cash.filteredItems = this.cash.list.items
      .filter(item => item.title.includes(this.cash.filterToInputOfItem));
  }

  public initializeItemId(): void {
    if (!this.cash.itemId && this.cash.itemId !== 0) {
      this.storage.get('itemId')
        .then(itemId => this.cash.itemId = itemId ? itemId : 0);
    }
  }

  public removeItem(id: number): void {
    const indexOfItem = this.cash.list.items.findIndex(item => item.id === id);
    this.cash.list.items.splice(indexOfItem, 1);
    this.updateFilteredItems();

    this.http.setList(this.cash.list.id, this.cash.list);
    this.storage.set(`${this.cash.list.id}`, JSON.stringify(this.cash.list));

    this.showNitification('The item was removed');
  }

  public editItem(title: string, description: string, id: number): void {
    const item = this.cash.list.items.find(item => item.id === id);
    item.title = title;
    item.description = description;

    this.http.setList(item.listId, this.cash.list);
    this.storage.set(`${item.listId}`, JSON.stringify(this.cash.list));

    this.showNitification('The item was edited');
  }
}