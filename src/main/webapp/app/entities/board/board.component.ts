import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBoard } from '@/shared/model/board.model';

import BoardService from './board.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Board extends Vue {
  @Inject('boardService') private boardService: () => BoardService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public boards: IBoard[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBoards();
  }

  public clear(): void {
    this.retrieveAllBoards();
  }

  public retrieveAllBoards(): void {
    this.isFetching = true;
    this.boardService()
      .retrieve()
      .then(
        res => {
          this.boards = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IBoard): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBoard(): void {
    this.boardService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('synergyDogApp.board.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllBoards();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
