import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { ListModel } from '../../model/list';
import { StoreService } from '../../service/store-service';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage implements OnInit {

  public input: string = '';
  private get lists(): ListModel[] {
    return this.store.lists;
  };
  public get filteredLists(): ListModel[] {
    return this.store.filteredLists;
  };

  constructor(
    private store: StoreService,
    private alertCtrl: AlertController,
  ) {}

  private save(title: string): void {
    this.store.saveList(title, this.input);
  }

  public filterLists(value): void {
    this.input = value;
    this.store.updateFilteredLists(this.input);
  }

  public openWindowToCreateList() {
    let alert = this.alertCtrl.create({
      title: 'Create list',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: data => this.save(data.title),
        }
      ]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.store.initializeLists();
    this.store.initializeListId();
  }
}
