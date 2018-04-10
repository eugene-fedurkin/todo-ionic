import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { ListModel } from '../../model/list';
import { CashService } from '../../service/cash-service';
import { ListsService } from '../../service/lists-service';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage implements OnInit {

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
    this.listsService.saveList(title, this.input);
  }

  public filterLists(value): void {
    this.input = value;
    this.listsService.updateFilteredLists(this.input);
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
    // this.listsService.initializeLists();
    // this.listsService.initializeListId();
  }
}
