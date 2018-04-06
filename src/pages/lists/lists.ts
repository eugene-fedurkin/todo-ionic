import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ListModel } from '../../model/list';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage implements OnInit {

  private id: number = 0;
  public input: string = '';
  private lists: ListModel[] = [];
  public filteredLists: ListModel[] = [];
  public get list(): ListModel[] {
    return this.lists;
  }
  
  constructor(
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}


  private save(title: string): void {
    const list = new ListModel(title, this.id);

    this.storage.set('id', this.id);
    this.storage.set(`${this.id}`, JSON.stringify(list));
    this.lists.push(list);
    this.updateFilterLists();
    this.id++;
  }

  public filterLists(value): void {
    this.input = value;
    this.updateFilterLists();
  }

  public select(list: ListModel): void {
    console.log(list)
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
          handler: data => {
            this.save(data.title);
          }
        }
      ]
    });
    alert.present();
  }

  private updateFilterLists(): void {
    this.filteredLists = this.lists.filter(list => list.title.indexOf(this.input) > -1);
  }

  ngOnInit(): void {
    this.storage.forEach((value, key) => {
      const list = JSON.parse(value);
      if (list.title) {
        this.lists.push(JSON.parse(value));
        this.filteredLists.push(JSON.parse(value));
      };
      console.log(value, key)
    });
    this.storage.get('id').then(id => {
      if (id !== null) this.id = id;
    });
  }
}
