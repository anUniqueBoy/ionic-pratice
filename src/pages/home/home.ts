import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { DetailsPage } from "../details/details";
import { BaseUI } from '../../providers/BaseUI';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

  feeds:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage, ) {
    super(); //调用父类的构造函数 constructor
  }

  ionViewDidLoad(){
    this.getFeeds()
  }

  // 跳到提问页面
  gotoQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  // 跳到聊天页面
  gotoChat() {
    this.selectTab(2);
  }

  // 选择指定的tab
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index)
  }

  // 获取数据
  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl, '加载中...');
    this.rest.getFeeds()
      .subscribe(
        f => {
          loading.dismiss();
          this.feeds=f;
        },
        error => this.errorMessage = <any>error)
  }

  // 跳到详情页面
  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage,{id:questionId})
  }
}
