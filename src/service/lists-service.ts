import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { CashService } from './cash-service';
import { HttpService } from './http-service';

import { ListModel } from '../model/list';
import { BaseService } from './base-service';
import { StorageService } from './storage-service';

@Injectable()
export class ListsService extends BaseService {

  constructor(
    private http: HttpService,
    private cash: CashService,
    private storage: StorageService,
    protected toastCtrl: ToastController,
  ) {
    super(toastCtrl);
  }

  public saveList(title: string) {
    const list = new ListModel(title, ++this.cash.listId);

    this.cash.lists.push(list);
    this.updateFilteredLists();

    if (this.cash.isOnline) {
      this.http.setList(this.cash.listId, list);
      this.http.listsRef.set('itemId', this.cash.itemId);
    } else {
      this.storage.set(`${this.cash.listId}`, list, this.cash.listId);
    }
    this.showNitification('The list was saved');
  }

  public updateFilteredLists(): void {
    this.cash.filteredLists = this.cash.lists
      .filter(list => list.title.indexOf(this.cash.filterToInputOfList) > -1);
  }

  public removeList(id: number) {
    const indexOfList = this.cash.lists.findIndex(list => list.id === id);
    this.cash.lists.splice(indexOfList, 1);
    this.updateFilteredLists();

    if (this.cash.isOnline) {
      this.http.removeList(id);
    } else {
      this.storage.remove(`${id}`);
    }
    this.showNitification('The list was removed');
  }

  public editList(title: string, id: number): void {
    const list = this.cash.lists.find(list => list.id === id);
    list.title = title;

    if (this.cash.isOnline) {
      this.http.setList(id, list);
    } else {
      this.storage.set(`${list.id}`, list);
    }
  }
}
