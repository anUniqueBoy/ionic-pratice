import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    // console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  login(mobile,password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin+"?mobile="+mobile+"&password="+password)
  }

  register(mobile,nickname,password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister+"?mobile="+mobile+"&nickname="+nickname+"&password="+password)
  }

  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo+"?userid="+userId)
  }

  updateNickName(userId,nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName+"?userid="+userId+"&nickname="+nickname)
  }

  saveQuestion(userId,title,content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave+"?userid="+userId+"&title="+title+"&content="+content)
  }

  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion+"?userid="+id)
  }


  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds)
  }

  


  /**
   * 全局获取http请求的方法
   * @limiaomiao
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 处理接口返回的数据，处理成json格式
   * @limiaomiao
   * @private
   * @param {Response} res
   * @returns
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {};
  }
  

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在console.log中显示
   * @limiaomiao
   * @private
   * @param {(Response|any)} error
   * @returns
   * @memberof RestProvider
   */
  private handleError(error:Response|any){
    let errMsg:String;
    if(error instanceof Response){
      const body=error.json()||'';
      const err=body.error||JSON.stringify(body);
      errMsg=`${error.status}-${error.statusText||''} ${err}`;
    }else{
      errMsg=error.message?error.message:error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
