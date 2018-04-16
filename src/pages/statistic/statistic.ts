import { Component } from '@angular/core';
import {StatisticServiceProvider} from "../../providers/statistic-service/statistic-service";
import {StatisticChartColors} from "../../consts/statistic";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {

  statisticChartColors = StatisticChartColors;
  viewState: string;


  trainingsDates = [];

  public lineChartData:Array<any> = [
    {
      data: []
    }
  ];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartType:string = 'line';

  constructor(
    private statisticService: StatisticServiceProvider
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
    this.lineChartData[0].data = this.statisticService.getWeightChangeArray();
  }

  checkTrainings() {
    this.statisticService.checkTrainings() ? this.viewState = 'view' : this.viewState = 'empty';
  }


}
