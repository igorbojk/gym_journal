import { Component } from '@angular/core';
import {ProfilePage} from "../profile/profile";
import {SettingPage} from "../setting/setting";
import {CalendarPage} from "../calendar/calendar";
import {JournalPage} from "../journal/journal";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor() {
    this.tab1 = JournalPage;
    this.tab2 = CalendarPage;
    this.tab3 = ProfilePage;
    this.tab4 = SettingPage;
  }


}
