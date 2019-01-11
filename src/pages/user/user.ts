import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { HeadfacePage } from '../headface/headface';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI  {

  headface: string;
  nickName: string;
  errorMessage:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public viewCtrl:ViewController ) {
      super()
  }

  // 页面加载后显示数据
  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 加载用户数据
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getUserInfo(val)
          .subscribe(
            userInfo => {
              this.nickName = userInfo['UserNickName'],
              this.headface = userInfo['UserHeadface'] + "?" + (new Date().valueOf);
              loading.dismiss();
            })
      }
    });
  }

  // 修改用户名
  updateNickName(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        // 加载用户数据
        var loading = super.showLoading(this.loadingCtrl, '修改中...');
        this.rest.updateNickName(val,this.nickName)
          .subscribe(
            f=>{
              if(f['Status']=='OK'){
                // super.showToast(this.toastCtrl,'昵称修改成功');
                loading.dismiss();
              }else{
                loading.dismiss();
                // super.showToast(this.toastCtrl,f["StatusContent"]);
              }
            },
            error=>this.errorMessage=<any>error)
      }
    });
  }

  // 退出登录
  logout(){
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }

  // 跳到修改头像页面
  gotoHeadface(){
    this.navCtrl.push(HeadfacePage)
  }

}
