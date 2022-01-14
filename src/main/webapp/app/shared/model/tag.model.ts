import { ITask } from '@/shared/model/task.model';

export interface ITag {
  id?: number;
  name?: string;
  tasks?: ITask[] | null;
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public tasks?: ITask[] | null) {}
}
