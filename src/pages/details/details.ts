import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { BaseUI } from '../../providers/BaseUI';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI  {

  id:string;
  question:string[];
  answer:string[];
  errorMessage:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,) {
      super(); //调用父类的构造函数 constructor
  }

  ionViewDidLoad() {
    this.id=this.navParams.get('id');
    this.loadQuestion(this.id);
  }
  
  loadQuestion(id){
    var loading=super.showLoading(this.loadingCtrl,'加载中....');
  }

}
