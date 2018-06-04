import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class FirebaseServiceProvider {

  constructor(public angularFireBase: AngularFireDatabase) {}

  getTrainings(){
    return this.angularFireBase.list('/trainings/');
  }

  addTraining(training){
    return this.angularFireBase.list('/trainings/').push(training);
  }

  removeTraining(id) {
    return this.angularFireBase.list('/trainings/').remove(id);
  }

}
