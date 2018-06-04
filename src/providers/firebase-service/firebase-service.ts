import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class FirebaseServiceProvider {

  constructor(public angularFireBase: AngularFireDatabase) {}

  getTrainings(){
    return this.angularFireBase.list('/trainings/');
  }

  getTraining(id) {
    return this.angularFireBase.object(`/trainings/${id}`);
  }

  addTraining(training){
    return this.angularFireBase.list('/trainings/').push(training);
  }

  removeTraining(id) {
    return this.angularFireBase.list('/trainings/').remove(id);
  }

  updateTraining(id, training) {
    return this.angularFireBase.list('/trainings/').update(id, training);
  }

}
