import {Component, OnInit} from '@angular/core';
import {StatisticServiceProvider} from "../../providers/statistic-service/statistic-service";
import {StatisticChartColors} from "../../consts/statistic";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage implements OnInit{

  trainings = [];

  chartData = {};
  test = false;

  statisticChartColors = StatisticChartColors;
  viewState: string;
  trainingsDates = {};
  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  constructor(
    private statisticService: StatisticServiceProvider
  ) {
  }

  ngOnInit() {
    this.checkTrainings();
    this.generateStatistic();
  }

  generateStatistic() {
    if (this.viewState == 'empty') {
      return;
    }
    this.getTrainingsDates();
    this.setWeightChangeArray();
    this.getTrainings();
    this.generateExercisesMaxWeight()
  }

  getTrainings() {
    this.trainings = this.statisticService.getTrainings();
  }

  getTrainingsDates() {
    this.trainingsDates['all'] = this.statisticService.getTrainingsDates();
  }

  generateExercisesMaxWeight() {
    this.trainings.forEach((element) => {
      this.trainingsDates[element.title] = this.statisticService.getTrainingDates(element.title);
      this.chartData[element.title]={};
      element.exercises.forEach((i) => {
        const data = this.statisticService.getExerciseMaxWeight(element.title, i.title);
        this.chartData[element.title][i.title] = [];
        this.chartData[element.title][i.title].push({data});
      });
    });
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


}
