import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { CashService } from './cash-service';
import { HttpService } from './http-service';

import { ListModel } from '../model/list';
import { BaseService } from './base-service';

@Injectable()
export class ListsService extends BaseService {

  constructor(
    private http: HttpService,
    private cash: CashService,
    private storage: Storage,
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
      this.storage.set('listId', this.cash.listId);
      this.storage.set(`${this.cash.listId}`, JSON.stringify(list));
      this.cash.wasChanges = true;
    }
    this.showNitification('The list was saved');
  }

  public updateFilteredLists(): void {
    this.cash.filteredLists = this.cash.lists
      .filter(list => list.title.indexOf(this.cash.filterToInputOfList) > -1);
  }

  // public initializeLists(): void { // TODO: its exist in cash-service
  //   this.cash.lists = [];
  //   this.cash.filteredLists = [];

  //   this.storage.forEach((value, key) => {
  //     const list = JSON.parse(value);
  //     if (list.title) {
  //       this.cash.lists.push(JSON.parse(value));
  //       this.cash.filteredLists.push(JSON.parse(value));
  //     };
  //   });
  // }

  // public initializeListId(): void {
  //   this.storage.get('listId')
  //     .then(listId => this.cash.listId = listId ? listId : 0);
  // }

  public removeList(id: number) {
    const indexOfList = this.cash.lists.findIndex(list => list.id === id);
    this.cash.lists.splice(indexOfList, 1);
    this.updateFilteredLists();

    if (this.cash.isOnline) {
      this.http.removeList(id);
    } else {
      this.storage.remove(`${id}`);
      this.cash.wasChanges = true;
    }
    this.showNitification('The list was removed');
  }
}
