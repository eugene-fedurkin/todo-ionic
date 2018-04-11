import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { ItemModel } from '../model/item';

import { CashService } from './cash-service';
import { HttpService } from './http-service';
import { BaseService } from './base-service';
import { StorageService } from './storage-service';

@Injectable()
export class ItemsService extends BaseService {

  constructor(
    private http: HttpService,
    private cash: CashService,
    private storage: StorageService,
    protected toastCtrl: ToastController,
  ) {
    super(toastCtrl);
  }

  public saveItem(title: string, description: string): void {
    if (!this.cash.list.items) this.cash.list.items = [];

    const item = new ItemModel(title, description, ++this.cash.itemId, this.cash.list.id);
    this.cash.list.items.push(item);
    this.updateFilteredItems();

    if (this.cash.isOnline) {
      this.http.setList(this.cash.list.id, this.cash.list);
      this.http.listsRef.set('itemId', item.id);
    } else {
      this.storage.set(`${this.cash.list.id}`, this.cash.list, null, this.cash.itemId);
    }

    this.showNitification('The item was saved');
  }

  public updateFilteredItems(): void {
    this.cash.filteredItems = this.cash.list.items
      .filter(item => item.title.includes(this.cash.filterToInputOfItem));
  }

  public removeItem(id: number): void {
    const indexOfItem = this.cash.list.items.findIndex(item => item.id === id);
    this.cash.list.items.splice(indexOfItem, 1);
    this.updateFilteredItems();

    if (this.cash.isOnline) {
      this.http.setList(this.cash.list.id, this.cash.list);
    } else {
      this.storage.set(`${this.cash.list.id}`, this.cash.list);
    }

    this.showNitification('The item was removed');
  }

  public editItem(title: string, description: string, id: number): void {
    const item = this.cash.list.items.find(item => item.id === id);
    item.title = title;
    item.description = description;

    if (this.cash.isOnline) {
      this.http.setList(item.listId, this.cash.list);
    } else {
      this.storage.set(`${item.listId}`, this.cash.list);
    }

    this.showNitification('The item was edited');
  }
}