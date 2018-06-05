import {Component} from "@angular/core";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {RegisterUserPage} from "../register-user/register-user";
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {Subscription} from "rxjs/Subscription";
import {Storage} from "@ionic/storage";
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage {


  constructor(
    private userService: UserServiceProvider,
    private navCtrl: NavController,
    private authService: AuthServiceProvider,
    private storage: Storage,
    private firebaseService: FirebaseServiceProvider
  ) {
  }

  trainingSubscription: Subscription = new Subscription();

  login(email, password) {
    this.authService.login(email, password).then(user => {
      this.userService.setUser(user).subscribe(
        result => {
          this.userService.currentUser = result.find(i => i.id === (user.uid || user.id));
          this.storage.set('currentUser', {id: user.uid || user.id});
          this.trainingSubscription = this.firebaseService.getCalendar().subscribe(
            result => {
              result.forEach(i => {
                if (!i.stopAt) {
                  this.firebaseService.deleteActiveTraining(i.$key);
                }
              });
              this.trainingSubscription.unsubscribe();
            }
          );
          this.navCtrl.setRoot(TabsPage)
        }
      );
      ;
    })
      .catch(err => {
        console.log(err);
      })
  }

  createUser(email, password) {
    this.authService.signUp(email, password);
  }

  updateUser(){
    this.authService.updateUserProfile();
  }

  logout(){
    this.authService.logout();
  }

  registerUser() {
    this.navCtrl.push(RegisterUserPage);
  }
}
