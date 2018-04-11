import { Injectable, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

import { ListModel } from '../model/list';
import { ItemModel } from '../model/item';

import { LoaderService } from './loader-service';
import { HttpService } from './http-service';
import { BaseService } from './base-service';

@Injectable()
export class CashService extends BaseService implements OnDestroy {

  public wasChanges: boolean = false;
  private connectSubscription: any;
  private disconnectSubscription: any;
  public isOnline: boolean = false;
  public filterToInputOfList: string = '';
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
    private network: Network,
    private storage: Storage,
    protected toastCtrl: ToastController,
  ) {
    super(toastCtrl);

    this.loader.showLoader();
    this.network.onchange().subscribe(data => {
      console.log(data)
    })
    this.http.valueChanges().subscribe(data => {
      this.isOnline = true;
      this.listId = Number.isInteger(data[data.length - 1]) ? data[data.length - 1] : 0;
      this.itemId = Number.isInteger(data[data.length - 2]) ? data[data.length - 2] : 0;
      this.lists = data.filter(list => typeof list === 'object');
      this.filteredLists = data.filter(list => typeof list === 'object');
      this.loader.hideLoader();
    },
    error => {
      this.showNitification('Data can\'t be availible right now');
    });
    this.subscribeToNetwork();
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

  private subscribeToNetwork(): void {
    console.log(this.network.type)
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      this.isOnline = true;

      if (this.wasChanges) {
        this.syncDateWithDatabase();
        this.wasChanges = false;
      }
      console.log(this.network.type)
      this.showNitification('Network connected');
    });
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log(this.network.type)
      this.isOnline = false;
      this.syncDateWithOfflineDatabase()
      this.showNitification('Network was disconnected!');
    });
  }

  private syncDateWithDatabase(): void {
    this.http.listsRef.remove();
    this.lists.forEach(list => {
      this.http.setList(list.id, list);
    });
    this.http.listsRef.set('itemId', this.itemId);
  }

  private syncDateWithOfflineDatabase(): void {
    this.storage.forEach((c, v) => console.log(c, v))
    this.storage.clear();
    this.lists.forEach(list => {
      this.storage.set(`${list.id}`, list);
    });
    this.storage.set('listId', this.listId);
    this.storage.set('itemId', this.itemId);
  }

  ngOnDestroy(): void {
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }
}
