import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {JournalProfilePage} from "../journal-profile/journal-profile";

@Component({
  selector: 'page-training-profile',
  templateUrl: 'training-profile.html',
})
export class TrainingProfilePage implements OnInit {

  training: any;

  constructor(
    public navParams: NavParams
  ) {
  }

  ngOnInit() {
    this.setCurrentTraining();
  }

  setCurrentTraining() {
    this.training = this.navParams.get('training');
  }


}
