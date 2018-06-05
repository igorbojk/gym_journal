import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatisticChartColors} from "../../consts/statistic";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {MomentServiceProvider} from "../../providers/moment-service/moment-service";
import {Subscription} from "rxjs/Subscription";
import {UserServiceProvider} from "../../providers/user-service/user-service";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage implements OnInit, OnDestroy{

  calendar = [];

  trainings = [];

  chartData = {};

  statisticChartColors = StatisticChartColors;
  viewState: string;
  trainingsDates = {};

  calendarSubscription: Subscription = new Subscription();
  trainingSubscription: Subscription = new Subscription();

  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  constructor(
    private firebaseService: FirebaseServiceProvider,
    private momentService: MomentServiceProvider,
    private userService: UserServiceProvider
  ) {
  }

  ngOnInit() {
    this.calendarSubscription = this.firebaseService.getCalendar().subscribe(
      result => {
        this.calendar = result.filter(i => i.userId == this.userService.currentUser.id);
        this.calendar.length ? this.viewState = 'view' : this.viewState = 'empty';
        this.generateStatistic();
      }
    );

  }
  ngOnDestroy(){
    this.calendarSubscription.unsubscribe();
    this.trainingSubscription.unsubscribe();
  }

  generateStatistic() {
    if (this.viewState == 'empty') {
      return;
    }
    this.getTrainingsDates();
    this.setWeightChangeArray();
    this.getTrainings();
  }

  getTrainings() {
    this.trainingSubscription = this.firebaseService.getTrainings().subscribe(
      result => {
        if(!result) {
          return;
        }
        this.trainings = result.filter(i => i.userId == this.userService.currentUser.id).filter(i => i.exercises.length);
        this.generateExercisesMaxWeight();
      }
    );
  }


  getTrainingsDates() {
    this.trainingsDates['all'] = [];
    this.calendar.forEach((element) => {
      this.trainingsDates['all'].push(this.momentService.getDate(element.startAt));
    });
  }

  generateExercisesMaxWeight() {
    this.trainings.forEach((element) => {
      this.trainingsDates[element.title] = this.getTrainingDates(element.title);
      this.chartData[element.title]={};
      element.exercises.forEach((i) => {
        const data = this.getExerciseMaxWeight(element.title, i.title);
        this.chartData[element.title][i.title] = [{data}];
      });
    });
  }

  getExerciseMaxWeight(trainingTitle, exerciseTitle) {
    const maxWeightArray = [];
    const filteredTrainings = this.calendar.filter(i => i.title == trainingTitle);
    filteredTrainings.forEach((element) => {
      if(!element || !element.exercises) {
        return;
      }
      if(!element.exercises.find(elem => elem.title == exerciseTitle)) {
        maxWeightArray.push(null);
      }
      element.exercises.filter(el => el.title == exerciseTitle).forEach((exercise) => {
        const weightArray = exercise.repetitions.map(i => i.weight);
        const maxWeight = Math.max.apply( Math, weightArray );
        maxWeightArray.push(maxWeight);
      });
    });
    return maxWeightArray;
  }

  getTrainingDates(title) {
    const trainingsDates = [];
    this.calendar.filter(i => i.title == title).forEach((element) => {
      trainingsDates.push(this.momentService.getDate(element.startAt));
    });
    return trainingsDates;
  }

  setWeightChangeArray() {
    const weightData = {
      data: this.getWeightChangeArray()
    };
    this.lineChartData.push(weightData);
  }

  getWeightChangeArray() {
    const weightChangeArray = [];
    this.calendar.forEach((element) => {
      if (element.weight) {
        weightChangeArray.push(element.weight);
      }
    });
    return weightChangeArray;
  }


}
