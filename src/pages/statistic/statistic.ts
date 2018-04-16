import { Component } from '@angular/core';
import {StatisticServiceProvider} from "../../providers/statistic-service/statistic-service";

@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {

  viewState: string;

  userWeight: number;
  currentWeight: number;
  weightMessage: string;

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

    this.userWeight = this.statisticService.testUser.weight;
    this.currentWeight = this.statisticService.getCurrentWeight();

    const weightChange = this.statisticService.getWeightChange();
    this.weightMessage = weightChange < 0 ? `Набрано ${Math.abs(weightChange)}` : `Сброшено ${Math.abs(weightChange)}`;
  }

  checkTrainings() {
    this.statisticService.checkTrainings() ? this.viewState = 'view' : this.viewState = 'empty';
  }

}
