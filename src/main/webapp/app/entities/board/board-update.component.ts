import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

import { IBoard, Board } from '@/shared/model/board.model';
import BoardService from './board.service';

const validations: any = {
  board: {
    name: {
      required,
      minLength: minLength(3),
    },
    handle: {
      required,
      minLength: minLength(2),
    },
  },
};

@Component({
  validations,
})
export default class BoardUpdate extends Vue {
  @Inject('boardService') private boardService: () => BoardService;
  @Inject('alertService') private alertService: () => AlertService;

  public board: IBoard = new Board();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.boardId) {
        vm.retrieveBoard(to.params.boardId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.board.id) {
      this.boardService()
        .update(this.board)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('synergyDogApp.board.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.boardService()
        .create(this.board)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('synergyDogApp.board.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveBoard(boardId): void {
    this.boardService()
      .find(boardId)
      .then(res => {
        this.board = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
