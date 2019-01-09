import { Loading, LoadingController, Toast, ToastController, Alert, AlertController } from 'ionic-angular';

/**
 * ui层的所有公共组件
 * limiaomiao
 * @export
 * @abstract
 * @class BaseUI
 */
export abstract class BaseUI {
    constructor(){}
    
    //loading
    protected showLoading(loadingCtrl: LoadingController,
        message: string): Loading{
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        })
        loader.present();
        return loader;
    }

    //app底部提示消息
    protected showToast(toastCtrl: ToastController,
      message: string): Toast{
          let toast = toastCtrl.create({
              message: message,
              duration: 3000,
              cssClass: 'bottom-toast',
              position: 'bottom'
          });
          toast.present();
          return toast;
  }

    //登录注册中央提示消息
    protected showAuthToast(toastCtrl: ToastController,
        message: string): Toast{
            let toast = toastCtrl.create({
                message: message,
                duration: 2000,
                cssClass: 'auth-toast',
                position: 'middle',
                dismissOnPageChange: true
            });
            toast.present();
            return toast;
    }

    //删除提示弹框
    protected showDelAlert(alertCtrl: AlertController,
        message: string, callback: Function): Alert{
            let alert = alertCtrl.create({
                title: '删除提示',
                message: message,
                buttons: [
                    {
                      text: '取消',
                      cssClass: 'dark',
                      role: 'cancle'
                    },
                    {
                      text: '删除',
                      handler: data => {
                        callback();
                      }
                    }
                  ]
            });
            alert.present();
            return alert;
        }


  //确认提示弹框
  protected showSureAlert(alertCtrl: AlertController, message: string, callback: Function): Alert{
    let alert = alertCtrl.create({
      title: '',
      message: message,
      buttons: [
        {
          text: '取消',
          cssClass: 'dark',
          role: 'cancle'
        },
        {
          text: '确认',
          handler: data => {
            callback();
          }
        }
      ]
    });
    alert.present();
    return alert;
  }

  //确认提示弹框
  protected showAlert(alertCtrl: AlertController, message: string, cancelback: Function,sureback: Function): Alert{
    let alert = alertCtrl.create({
      title: '',
      message: message,
      enableBackdropDismiss:false, //禁止点击空白区域关闭alert
      buttons: [
        {
          text: '取消',
          handler: data => {
            cancelback();
          }
        },
        {
          text: '确认',
          handler: data => {
            sureback();
          }
        }
      ]
    });
    alert.present();
    return alert;
  }

}
