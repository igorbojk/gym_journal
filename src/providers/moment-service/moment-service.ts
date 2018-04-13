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

  getDuration(duration){
    return moment.duration(duration).humanize();
  }

}
