import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

import { IonicStorageModule } from '@ionic/storage';

// 导入四个外部加载进来的组件
import {File} from '@ionic-native/file';
import {Transfer,TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局http的定义
    IonicStorageModule.forRoot(), //全局stroage的定义
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, //rest的全局引入
    File,
    Transfer,
    FilePath,
    Camera
  ]
})
export class AppModule { }
