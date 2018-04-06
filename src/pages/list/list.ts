import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Items } from '../items/items';
import { ListModel } from '../../model/list';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class List {

  private items: any = Items // TODO: change type

  @Input('list')
  public list: ListModel;

  constructor(public navCtrl: NavController) {}

  public select(list: ListModel): void {
    this.navCtrl.push(this.items, { list });
  }
}
