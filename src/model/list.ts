import { ItemModel } from './item';

export class ListModel {
  constructor(
    public title: string,
    public id: number,
    public items: ItemModel[] = [],
  ) {}
}
