import { IUser } from '@/shared/model/user.model';

export interface IBoard {
  id?: number;
  name?: string;
  handle?: string;
  user?: IUser | null;
}

export class Board implements IBoard {
  constructor(public id?: number, public name?: string, public handle?: string, public user?: IUser | null) {}
}
