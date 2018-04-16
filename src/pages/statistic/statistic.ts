import { Component } from '@angular/core';
import {StatisticServiceProvider} from "../../providers/statistic-service/statistic-service";
import {StatisticChartColors} from "../../consts/statistic";
import {ActionSheetController} from "ionic-angular";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {

  statisticChartColors = StatisticChartColors;
  viewState: string;
  trainingsDates = [];
  currentTraining;
  currentTrainingDates = [];
  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  constructor(
    private statisticService: StatisticServiceProvider,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.checkTrainings();
    this.generateStatistic();
  }

  generateStatistic() {
    if (this.viewState == 'empty') {
      return;
    }
    this.getTrainingsDates();
    this.setWeightChangeArray();
  }

  getTrainingsDates() {
    this.trainingsDates = this.statisticService.getTrainingsDates();
  }

  setWeightChangeArray() {
    const weightData = {
      data: this.statisticService.getWeightChangeArray()
    };
    this.lineChartData.push(weightData);
  }

  checkTrainings() {
    this.statisticService.checkTrainings() ? this.viewState = 'view' : this.viewState = 'empty';
  }

  setTraining(element) {
    this.currentTraining = element;
    this.getCurrentTrainingDates();
  }

  getCurrentTrainingDates() {
    this.currentTrainingDates = this.statisticService.getCurrentTrainingsDates(this.currentTraining.title);
  }


  getExerciseMaxWeight(exercisetitle) {
    return this.statisticService.getExerciseMaxWeight(this.currentTraining.title, exercisetitle);
  }

  openChartSortingMenu() {
    const isShowTitle = !this.generateButtonsForTrainings().length;
    let actionSheet = this.actionSheetCtrl.create({
      title: isShowTitle ? 'Нет треннировок с упражнениями' : '',
      buttons: this.generateButtonsForTrainings()
    });
    actionSheet.present();
  }

  generateButtonsForTrainings() {
    const buttons = [];
    const trainings = this.statisticService.getJournalTrainings();
    trainings.forEach((element, index) => {
      if(!trainings[index].exercises.length) {
        return;
      }
      buttons.push(
        {
          text: element.title,
          handler: () => {
            this.setTraining(element);
          }
        }
      );
    });
    return buttons;
  }

}
