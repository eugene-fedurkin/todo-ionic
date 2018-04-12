import { Component, Input } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Items } from '../items/items';
import { ListModel } from '../../model/list';

import { ListsService } from '../../service/lists-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class List {

  @Input('list')
  public list: ListModel;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private listService: ListsService,
  ) {}

  public select(list: ListModel): void {
    this.navCtrl.push(Items, { list });
  }

  public deleteList(event: Event, list: ListModel): void {
    event.stopPropagation();
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Do you want to remove "${list.title}" list?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Remove',
          handler: () => this.listService.removeList(list.id),
        }
      ]
    });
    alert.present();
  }


  public openWindowToEdit(event: Event, list: ListModel): void {
    event.stopPropagation();
    const editWindow = this.alertCtrl.create({
      title: 'Edit list',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: list.title,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Create',
          handler: data => this.listService.editList(data.title, list.id),
        }
      ]
    });
    editWindow.present();
  }
}
