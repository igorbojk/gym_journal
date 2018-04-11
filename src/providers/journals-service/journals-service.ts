import { Injectable } from '@angular/core';

@Injectable()
export class JournalsServiceProvider {

  journals = [
    {
      title: 'Жесткая треннировка'
    }
  ];

  constructor() {
  }

}
