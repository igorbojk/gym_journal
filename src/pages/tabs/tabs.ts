import { Component } from '@angular/core';
import {TrainingPage} from "../training/training";
import {ProfilePage} from "../profile/profile";
import {SettingPage} from "../setting/setting";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor() {
    this.tab1 = TrainingPage;
    this.tab2 = ProfilePage;
    this.tab3 = SettingPage;
  }


}
