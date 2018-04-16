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
import { JournalServiceProvider } from '../providers/journal-service/journal-service';
import {TrainingProfilePage} from "../pages/training-profile/training-profile";
import {CalendarPage} from "../pages/calendar/calendar";
import { MomentServiceProvider } from '../providers/moment-service/moment-service';
import {CurrentTrainingPage} from "../pages/current-training/current-training";
import { DeviceEventsProvider } from '../providers/device-events/device-events';

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
    CurrentTrainingPage
  ],
  imports: [
    BrowserModule,
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
    CurrentTrainingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    JournalServiceProvider,
    MomentServiceProvider,
    DeviceEventsProvider
  ]
})
export class AppModule {}
