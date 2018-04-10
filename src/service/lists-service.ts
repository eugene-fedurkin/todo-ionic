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
    this.storage.clear()
  }

  public saveList(title: string, valueToSearch: string) {
    const list = new ListModel(title, ++this.cash.listId);

    this.storage.set('listId', this.cash.listId);
    this.storage.set(`${this.cash.listId}`, JSON.stringify(list));
    this.cash.lists.push(list);
    this.updateFilteredLists(valueToSearch);

    this.http.setList(this.cash.listId, list);
    this.http.listsRef.set('itemId', this.cash.itemId);

    this.showNitification('The list was saved');
    // this.tasksRef.set(`${this.cash.listId}`, list);
  }

  public updateFilteredLists(title: string): void {
    this.cash.filteredLists = this.cash.lists.filter(list => list.title.indexOf(title) > -1);
  }

  public initializeLists(): void { // TODO: its exist in cash-service
    this.cash.lists = [];
    this.cash.filteredLists = [];

    this.storage.forEach((value, key) => {
      const list = JSON.parse(value);
      if (list.title) {
        this.cash.lists.push(JSON.parse(value));
        this.cash.filteredLists.push(JSON.parse(value));
      };
    });
  }

  public initializeListId(): void {
    this.storage.get('listId')
      .then(listId => this.cash.listId = listId ? listId : 0);
  }

  public removeList(id: number) {
    this.http.removeList(id);
    this.storage.remove(`${id}`)
      .then(resp => {
        this.showNitification('The list was removed')
        // this.initializeLists();
      });
  }
}