import {Injectable} from '@angular/core';
import {Journal} from "../../declarations/gym-journal.declaration";

@Injectable()
export class JournalsServiceProvider {

  journals: Journal[] = [
    {
      title: 'Жесткая треннировка',
      trainings: [
        {
          title: 'Бицепс/трицепс'
        },
        {
          title: 'Спина/грудь'
        }
      ]
    }
  ];

  constructor() {
  }

  deleteJournal(journal) {
    this.journals = this.journals.filter(i => i !== journal)
  }

}
