import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { ListModel } from '../model/list';

@Injectable()
export class HttpService {

  public listsRef: AngularFireList<any>;

  constructor(private database: AngularFireDatabase) {
    this.listsRef = this.database.list('test-task');
  }

  public valueChanges(): Observable<any> {
    return this.listsRef.valueChanges();
  }

  public setList(listId: number, list: ListModel): void {
    this.listsRef.set(`${listId}`, list);
    this.listsRef.set('listId', listId);
  }

  public removeList(listId): Promise<any> {
    return this.listsRef.remove(`${listId}`);
  }
}