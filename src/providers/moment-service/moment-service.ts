import { Injectable } from '@angular/core';

import * as moment from 'moment';

moment.locale('ru');

@Injectable()
export class MomentServiceProvider {

  constructor() {

  }


  getFullDate(date) {
    return moment(date).format('YYYY Do MMM dddd  HH:mm')
  }

  getDate(date) {
    return moment(date).format('DD dd')
  }

  getDuration(duration){
    return moment.duration(duration).humanize();
  }

}
