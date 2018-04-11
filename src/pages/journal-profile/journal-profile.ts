import { Component } from '@angular/core';
import {App, NavParams} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-journal-profile',
  templateUrl: 'journal-profile.html',
})
export class JournalProfilePage {

  currentJournal: any;

  constructor(
    public navParams: NavParams,
    private app: App
  ) {
    this.setCurrentJournal();
  }

  setCurrentJournal() {
    this.currentJournal = this.navParams.get('journal');
  }

  back() {
    this.app.getRootNav().setRoot(TabsPage);
  }
}
