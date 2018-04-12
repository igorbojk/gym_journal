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
import {TrainingPage} from "../pages/training/training";
import {JournalProfilePage} from "../pages/journal-profile/journal-profile";
import { JournalsServiceProvider } from '../providers/journals-service/journals-service';
import {TrainingProfilePage} from "../pages/training-profile/training-profile";
import {CalendarPage} from "../pages/calendar/calendar";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    TrainingPage,
    SettingPage,
    ProfilePage,
    JournalProfilePage,
    TrainingProfilePage,
    CalendarPage
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
    TrainingPage,
    SettingPage,
    ProfilePage,
    JournalProfilePage,
    TrainingProfilePage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    JournalsServiceProvider
  ]
})
export class AppModule {}
