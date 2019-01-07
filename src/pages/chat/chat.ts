import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
declare var Player: any;
declare var $: any;
declare let Wechat: any;

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage{


  ws:any;
  player = new Player();
  webcamInfo: any;

  lenVideo:any;
  

  constructor(
    // public httpServer: HttpService,
  ) {
    // super()
  }

  ionViewDidLoad() {
    this.live();
  }
 
  ionViewWillLeave() {
    this.ws.close();
  }

  //直播
  live() {
    this.ws = new WebSocket("ws://120.27.21.149:9066")
    this.ws.binaryType = 'arraybuffer';
    $(".video-box").append(this.player.canvas);

    this.ws.onopen = evt => {
      let option={
        type:4,
        info: {
          deviceid: "VPBIM7K",//设备厂家的唯一序列号（设备唯一号）
        }
      }
      console.log(option)
      this.ws.send(JSON.stringify(option));
    };

    this.ws.onclose = evt => {
      console.log("直播断开");
      // super.showToast(this.toastCtrl, "直播已关闭")
    };

    this.ws.onmessage = evt => {
      console.log(evt.data)
      var messageData = new Uint8Array(evt.data);
      this.player.decode(messageData);
    };

    this.ws.onerror = evt => {
      console.log("出错")
    };
  }

}
