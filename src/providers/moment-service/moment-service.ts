import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class MomentServiceProvider {

  constructor() {

  }


  getFullDate(date) {
    return moment(date).format('YYYY MM DD  hh:mm')
  }
}
