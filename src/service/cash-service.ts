import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// import { ToastController } from 'ionic-angular';

import { ListModel } from '../model/list';
import { ItemModel } from '../model/item';

import { LoaderService } from './loader-service';
import { HttpService } from './http-service';

@Injectable()
export class CashService {

  public filterToInputOfItem: string = '';
  public listId: number = 0;
  public itemId: number = 0;
  public lists: ListModel[] = [];
  public filteredLists: ListModel[] = [];
  public list: ListModel;
  public filteredItems: ItemModel[] = [];
 
  constructor(
    private http: HttpService,
    private loader: LoaderService,
    private storage: Storage,
  ) {
    this.loader.showLoader();
    this.http.valueChanges().subscribe(data => {
      this.listId = data[data.length - 1] || 0;
      this.itemId = data[data.length - 2] || 0;
      this.lists = data.slice(0, data.length - 2);
      this.filteredLists = data.slice(0, data.length - 2);
      this.loader.hideLoader();
    },
    error => {
      console.log('##############')
      this.initializeLists()
    })
    console.log(this.storage.forEach((c, k)=> console.log(c, k)))
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
}
