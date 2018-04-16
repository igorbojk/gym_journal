import { Component } from '@angular/core';
import {ProfilePage} from "../profile/profile";
import {SettingPage} from "../setting/setting";
import {CalendarPage} from "../calendar/calendar";
import {JournalPage} from "../journal/journal";
import {StatisticPage} from "../statistic/statistic";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  journal = JournalPage;
  calendar = CalendarPage;
  statistic = StatisticPage;
  profile = ProfilePage;
  settings = SettingPage;

  constructor() {
  }


}
