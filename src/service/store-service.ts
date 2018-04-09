import { Injectable } from '@angular/core';
import { ListModel } from '../model/list';

import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { ItemModel } from '../model/item';

@Injectable()
export class StoreService {

  private listId: number = 0;
  private itemId: number = 0;
  public lists: ListModel[] = [];
  public filteredLists: ListModel[] = [];
  public list: ListModel;
  public filteredItems: ItemModel[] = [];

  private tasksRef: AngularFireList<any>;

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    public database: AngularFireDatabase,
  ) {

    this.tasksRef = this.database.list('tast-task');
    this.tasksRef.valueChanges().subscribe(data => {
      this.lists = data;
      this.filteredLists = data;
    })
  }

  public saveList(title: string, valueToSearch: string) {
    const list = new ListModel(title, ++this.listId);

    this.storage.set('listId', this.listId);
    this.storage.set(`${this.listId}`, JSON.stringify(list));
    this.lists.push(list);
    this.updateFilteredLists(valueToSearch);

    this.showNitification('The list was saved');
    this.tasksRef.set(`${this.listId}`, list);
  }

  public saveItem(title: string, description: string): void {
    const item = new ItemModel(title, description, ++this.itemId, this.list.id);

    this.list.items.push(item);
    this.storage.set('itemId', this.itemId);
    this.storage.set(`${this.list.id}`, JSON.stringify(this.list));

    this.showNitification('The item was saved');
  }

  public updateFilteredLists(title: string): void {
    this.filteredLists = this.lists.filter(list => list.title.indexOf(title) > -1);
  }

  public updateFilteredItems(title: string): void {
    this.filteredItems = this.list.items.filter(item => item.title.includes(title));
  }

  public initializeLists(): void {
    this.lists = [];
    this.filteredLists = [];

    this.storage.forEach((value, key) => {
      const list = JSON.parse(value);
      if (list.title) {
        this.lists.push(JSON.parse(value));
        this.filteredLists.push(JSON.parse(value));
      };
    });
  }

  public initializeListId(): void {
    this.storage.get('listId')
      .then(listId => this.listId = listId ? listId : 0);
  }

  public initializeItemId(): void {
    this.storage.get('itemId')
      .then(itemId => this.itemId = itemId ? itemId : 0);
  }

  public removeList(id: number) {
    this.storage.remove(`${id}`)
      .then(resp => {
        this.initializeLists();
        this.showNitification('The list was removed');
      });
  }

  public removeItem(id: number): void {
    const indexOfItem = this.list.items.findIndex(item => item.id === id);
    this.list.items.splice(indexOfItem, 1);
    this.storage.set(`${this.list.id}`, JSON.stringify(this.list));

    this.showNitification('The item was removed');
   }

  public editItem(title: string, description: string, id: number): void {
    const item = this.list.items.find(item => item.id === id);
    item.title = title;
    item.description = description;
    this.storage.set(`${item.listId}`, JSON.stringify(this.list));

    this.showNitification('The item was edited');
  }

  private showNitification(message: string, duration: number = 3000): void {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }
}
