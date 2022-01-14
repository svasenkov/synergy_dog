import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import BoardService from './board/board.service';
import TaskService from './task/task.service';
import TagService from './tag/tag.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('boardService') private boardService = () => new BoardService();
  @Provide('taskService') private taskService = () => new TaskService();
  @Provide('tagService') private tagService = () => new TagService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
