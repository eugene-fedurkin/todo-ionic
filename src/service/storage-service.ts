import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { CashService } from './cash-service';
import { ListModel } from '../model/list';

@Injectable()
export class StorageService {

  constructor(private storage: Storage, private cash: CashService) {}

  public set(
    key: string,
    value: ListModel | string | number,
    listId?: number,
    itemId?: number
  ): void {
    if (listId) this.storage.set('listId', listId);
    if (itemId) this.storage.set('itemId', itemId);

    this.storage.set(key, value);
    this.storage.set('wasChanges', true);
    this.cash.wasChanges = true;
  }

  public get(key: string) {
    this.storage.get(key);
  }

  public initializeParams() {
    this.storage.forEach((list, key) => {
      if (list.title) {
        this.cash.lists.push(list);
        this.cash.filteredLists.push(list);
      }
    });
    this.storage.get('listId').then(id => this.cash.listId = id);
    this.storage.get('itemId').then(id => this.cash.itemId = id);
  }

  public clear() {
    this.storage.clear();
  }

  public remove(id: string): void {
    this.storage.remove(id);
    this.storage.set('wasChanges', true);
    this.cash.wasChanges = true;
  }
}