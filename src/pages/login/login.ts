import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import {BaseUI} from '../../common/baseui'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{

  phone:any;
  password:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewContrl: ViewController,
    public loadingCtrl: LoadingController
  ) {
    super()
  }
  
  // 登录按钮
  login(){
    var loading= super.showLoading(this.loadingCtrl,'登录中...')
  }

  // 取消按钮
  dismiss(){
    this.viewContrl.dismiss();
  }

}
