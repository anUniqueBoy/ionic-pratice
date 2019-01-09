import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { UserPage } from '../user/user';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userInfo: string[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
  ) {
    super()
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    // 关闭后回调
    modal.onDidDismiss(()=>{
      this.ionViewDidEnter()
    })
    modal.present();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 加载用户数据
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserInfo(val)
          .subscribe(
            userInfo => {
              this.userInfo = userInfo,
              this.headface = userInfo['UserHeadface'] + "?" + (new Date().valueOf);
              loading.dismiss();
              this.notLogin = false;
              this.logined = true;
            })
      } else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }
}
