import { IBoard } from '@/shared/model/board.model';
import { ITag } from '@/shared/model/tag.model';

export interface ITask {
  id?: number;
  title?: string;
  content?: string;
  date?: Date;
  board?: IBoard | null;
  tags?: ITag[] | null;
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public date?: Date,
    public board?: IBoard | null,
    public tags?: ITag[] | null
  ) {}
}
