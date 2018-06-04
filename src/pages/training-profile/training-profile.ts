import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from "ionic-angular";
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {Exercise} from "../../declarations/gym-journal.declaration";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";


@Component({
  selector: 'page-training-profile',
  templateUrl: 'training-profile.html',
})
export class TrainingProfilePage implements OnInit {

  training: any;

  trainingId: string;

  constructor(
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private journalService: JournalServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private firebaseService: FirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.firebaseService.getTraining(this.navParams.get('trainingId')).subscribe(
      result => {
        this.training = result;
      }
    );
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
              if(!this.training.exercises){
                this.training.exercises = [];
              }
              for (let i = 1; i <= exercise.repetitionsCount; i++) {
                exercise.repetitions.push({repetition:0, weight: 0});
              }
              this.training.exercises.push(exercise);
              this.firebaseService.updateTraining(this.training.$key, this.training);
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
            const updateExercise = this.training.exercises.find(i => i.id == exercise.id);
            Object.assign(updateExercise, data);
            this.firebaseService.updateTraining(this.training.$key, this.training);
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
    this.training.exercises = this.training.exercises.filter(i => i.id !== exercise.id);
    this.firebaseService.updateTraining(this.training.$key, this.training);
    this.showToast('Упражнение удалено');
  }


}
