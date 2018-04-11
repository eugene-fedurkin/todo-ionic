import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { ListModel } from '../../model/list';
import { CashService } from '../../service/cash-service';
import { ListsService } from '../../service/lists-service';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  public input: string = '';
  private get lists(): ListModel[] {
    return this.cash.lists;
  };
  public get filteredLists(): ListModel[] {
    return this.cash.filteredLists;
  };

  constructor(
    private cash: CashService,
    private listsService: ListsService,
    private alertCtrl: AlertController,
  ) {}

  private save(title: string): void {
    this.listsService.saveList(title);
  }

  public filterLists(value): void {
    this.cash.filterToInputOfList = value;
    this.listsService.updateFilteredLists();
  }

  public openWindowToCreateList() {
    const createWindow = this.alertCtrl.create({
      title: 'Create list',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Create',
          handler: data => this.save(data.title),
        }
      ]
    });
    createWindow.present();
  }
}
