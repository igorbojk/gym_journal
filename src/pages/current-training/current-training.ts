import {Component, OnDestroy, OnInit} from '@angular/core';
import {JournalServiceProvider} from "../../providers/journal-service/journal-service";
import {App, NavParams} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {Training} from "../../declarations/gym-journal.declaration";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'page-current-training',
  templateUrl: 'current-training.html',
})
export class CurrentTrainingPage implements OnInit, OnDestroy{

  trainingId: string;
  trainingIdToSave: string;

  currentTraining: Training;

  itemsSubscription: Subscription = new Subscription();
  itemsSubscriptionTrainings: Subscription = new Subscription();

  constructor(
    private navParams: NavParams,
    private app: App,
    private firebaseService: FirebaseServiceProvider
  ) {

  }

  ngOnInit() {
    this.itemsSubscriptionTrainings = this.firebaseService.getTraining(this.navParams.get('trainingId')).subscribe(
      result => {
        this.currentTraining = result;
      }
    );
  }

  stopTraining() {
    this.itemsSubscription = this.firebaseService.getCalendar().subscribe(
      result => {
        const target = result ? result.find(i => i.id == this.navParams.get('trainingIdToSave')) : null;
        this.trainingIdToSave = target ? target.$key : null;
        this.currentTraining.stopAt = Date.now();
        this.firebaseService.stopTraining(this.trainingIdToSave, this.currentTraining);
        this.itemsSubscription.unsubscribe();
      }
    );
    this.app.getRootNav().setRoot(TabsPage);
  }

  ngOnDestroy(){
    this.itemsSubscriptionTrainings.unsubscribe();
  }

}
