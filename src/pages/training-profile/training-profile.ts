import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from "ionic-angular";
import {JournalsServiceProvider} from "../../providers/journals-service/journals-service";
import {ExerciseModel} from "../../declarations/gym-journal.declaration";


@Component({
  selector: 'page-training-profile',
  templateUrl: 'training-profile.html',
})
export class TrainingProfilePage implements OnInit {

  training: any;

  journalId: string;
  trainingId: string;

  constructor(
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalsService: JournalsServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.journalId = this.navParams.get('journalId');
    this.trainingId = this.navParams.get('trainingId');
    this.setCurrentTraining();
  }

  setCurrentTraining() {
    this.training = this.journalsService.getTraining(this.journalId, this.trainingId);
  }

  addExercise() {
      let promt = this.alertCtrl.create({
        title: 'Создание нового упражнения',
        inputs: [
          {
            name: 'title',
            placeholder: 'Введите название'
          },
          {
            name: 'repetitions',
            type: 'number',
            placeholder: 'Введите количество подходов'
          }
        ],
        buttons: [
          {
            text: 'Отмена',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Сохранить',
            handler: (data) => {
              if(!data.title.length) {
                this.showToast('Введите название');
                return false;
              }
              if(!data.repetitions.length) {
                this.showToast('Введите количество подходов');
                return false;
              }
              const exercise = new ExerciseModel(data.title, data.repetitions);
              this.journalsService.addExercise(this.journalId, this.trainingId, exercise);
              this.showToast(`${data.title} добавлен`);
            }
          }
        ]
      });
      promt.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }


  editExercise(exercise) {
    let promt = this.alertCtrl.create({
      title: 'Редактирование упражнения',
      inputs: [
        {
          name: 'title',
          placeholder: 'Введите название',
          value: exercise.title
        },
        {
          name: 'repetitions',
          type: 'number',
          value: exercise.repetitions,
          placeholder: 'Введите количество подходов'
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Сохранить',
          handler: (data) => {
            if(!data.title.length) {
              this.showToast('Введите название');
              return false;
            }
            if(!data.repetitions.length) {
              this.showToast('Введите количество подходов');
              return false;
            }
            this.journalsService.editExrcise(this.journalId, this.trainingId, exercise.id, data);
            this.showToast('Сохранено');
          }
        }
      ]
    });
    promt.present();
  }

  openMenu(exercise) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'create',
          text: 'Редактировать',
          handler: () => {
            this.editExercise(exercise);
          }
        },
        {
          icon: 'trash',
          text: 'Удалить',
          handler: () => {
            this.deleteExercise(exercise);
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteExercise(exercise) {
    this.journalsService.deleteExercise(this.journalId, this.trainingId, exercise);
    this.showToast('Упражнение удалено');
  }


  deleteTraining() {
    this.navCtrl.popToRoot();
    this.journalsService.deleteTraining(this.journalId, this.trainingId);
    this.showToast('треннировку удалено');
  }

  editTraining() {
    let promt = this.alertCtrl.create({
      title: 'Введите название треннировки',
      inputs: [
        {
          name: 'title',
          placeholder: 'Введите название',
          value: this.training.title
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Сохранить',
          handler: (data) => {
            if(!data.title.length) {
              this.showToast('Введите название');
              return false;
            }
            this.journalsService.updateTraining(this.journalId, this.trainingId, data);
          }
        }
      ]
    });
    promt.present();
  }

}
