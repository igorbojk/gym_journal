import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import { UserServiceProvider } from '../providers/user-service/user-service';
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {SettingPage} from "../pages/setting/setting";
import {JournalPage} from "../pages/journal/journal";
import {TrainingProfilePage} from "../pages/training-profile/training-profile";
import {CalendarPage} from "../pages/calendar/calendar";
import { MomentServiceProvider } from '../providers/moment-service/moment-service';
import {CurrentTrainingPage} from "../pages/current-training/current-training";
import {HistoryTrainingProfilePage} from "../pages/history-training-profile/history-training-profile";
import {StatisticPage} from "../pages/statistic/statistic";
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';
import { LongPressModule } from 'ionic-long-press';

import {HttpModule} from "@angular/http";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {FirebaseServiceProvider} from "../providers/firebase-service/firebase-service";
import {Network} from "@ionic-native/network";

const firebaseConfig = {
  apiKey: "AIzaSyByBGh2c_eUbXY_yS1KbIvvNRO_lr2oFkw",
  authDomain: "gymgournal-5ee73.firebaseapp.com",
  databaseURL: "https://gymgournal-5ee73.firebaseio.com",
  projectId: "gymgournal-5ee73",
  storageBucket: "gymgournal-5ee73.appspot.com",
  messagingSenderId: "948999234749"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    SettingPage,
    ProfilePage,
    JournalPage,
    TrainingProfilePage,
    CalendarPage,
    CurrentTrainingPage,
    HistoryTrainingProfilePage,
    StatisticPage
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    IonicStorageModule.forRoot(),
    LongPressModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    SettingPage,
    ProfilePage,
    JournalPage,
    TrainingProfilePage,
    CalendarPage,
    CurrentTrainingPage,
    HistoryTrainingProfilePage,
    StatisticPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    MomentServiceProvider,
    Network,
    FirebaseServiceProvider
  ]
})
export class AppModule {}
