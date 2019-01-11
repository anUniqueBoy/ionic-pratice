import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../providers/BaseUI';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

  title:string;
  content:string;
  errorMessage:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage, ) {
    super(); //调用父类的构造函数 constructor
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  /**
   * 关闭当前页面的方法
   *
   * @memberof LoginPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // 提问按钮被点击
  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, '提问中...');
        this.rest.saveQuestion(val, this.title, this.content)
          .subscribe(
            f => {
              if (f['Status'] == 'OK') {
                loading.dismiss();
                this.dismiss();
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
            },
            error => this.errorMessage = <any>error)
      }
    });
  }
}
