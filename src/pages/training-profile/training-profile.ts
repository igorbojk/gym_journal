import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {Exercise} from "../../declarations/gym-journal.declaration";


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
    private journalService: JournalServiceProvider,
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
    this.training = this.journalService.getTraining(this.trainingId);
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
            name: 'repetitionsCount',
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
              if(!data.repetitionsCount.length) {
                this.showToast('Введите количество подходов');
                return false;
              }
              const exercise = new Exercise(data.title, data.repetitionsCount);
              this.journalService.addExercise(this.trainingId, exercise);
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
          name: 'repetitionsCount',
          type: 'number',
          value: exercise.repetitionsCount,
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
            if(!data.repetitionsCount.length) {
              this.showToast('Введите количество подходов');
              return false;
            }
            data.repetitionsCount = +data.repetitionsCount;
            this.journalService.editExercise(this.trainingId, exercise.id, data);
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
    this.journalService.deleteExercise(this.trainingId, exercise);
    this.showToast('Упражнение удалено');
  }


}
