import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,ToastController} from 'ionic-angular';
import {BaseUI} from '../../providers/BaseUI';
import {RestProvider} from '../../providers/rest/rest';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{

  phone:string;
  password:string;
  name:string;
  repeatPassword:any;
  errorMessage:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewContrl: ViewController,
     public loadingCtrl: LoadingController,
     public rest: RestProvider,
     public storage:Storage,
     public toastCtrl:ToastController,) {
    super(); //调用父类的构造函数 constructor
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  /**
   * 注册
   *
   * @memberof RegisterPage
   */
  doRegister(){
    // 前台验证表单数据的正确性
    if(!(/^1[34578]\d{9}$/.test(this.phone))){
      super.showToast(this.toastCtrl,'您的手机号格式不正确');
    }else if(this.name.length<3||this.name.length>10){
      super.showToast(this.toastCtrl,'昵称的长度应该在3-10之间');
    }else if(this.password.length<6||this.password.length>20
      ||this.repeatPassword.length<6||this.repeatPassword.length>20){
      super.showToast(this.toastCtrl,'密码的长度应该在6-20之间');
    }else if(this.password!=this.repeatPassword){
      super.showToast(this.toastCtrl,'两次输入的密码不一致');
    }else{
      var loading= super.showLoading(this.loadingCtrl,'注册中...');
      this.rest.register(this.phone,this.name,this.password)
      .subscribe(
        f=>{
          if(f['Status']=='OK'){
            super.showToast(this.toastCtrl,'注册成功');
            loading.dismiss();
            this.dismiss();
          }else{
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"]);
          }
        },
        error=>this.errorMessage=<any>error)
    }
  }

  /**
   * 关闭当前页面的方法
   *
   * @memberof LoginPage
   */
  dismiss(){
    this.viewContrl.dismiss();
  }

  /**
   * 跳转到登录页面
   *
   * @memberof RegisterPage
   */
  goToLogin(){
    this.navCtrl.pop();
  }

}
