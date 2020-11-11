import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { WebSettingsService } from './web-settings.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  constructor(private webSettings: WebSettingsService) { }

  //#region [ MÉTODOS HTTP NATIVOS/WEB ]

  public GET(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      new HTTP().get(
        addr,
        parameters,
        headers
      ).then(data => {
        successCallback(data);
      }).catch(error => {
        errorCallback(error);
      });
    }
    else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.open('GET', addr + '?' + Object.keys(parameters).map(function (key) { return key + '=' + encodeURIComponent(parameters[key]) }).join('&'), true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log('Data incoming:');
          console.log(this);
          successCallback({ 'data': this.responseText });
        }
      }
      if (typeof headers != 'undefined' || headers === null) {
        for (let prop in headers) {
          xhr.setRequestHeader(prop, headers[prop]);
        }
      }
      xhr.onerror = errorCallback;
      xhr.send(null);
    }
  }

  public POST(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      let HttpRequest = new HTTP();
      HttpRequest.setDataSerializer('json');
      HttpRequest.post(
        addr,
        parameters,
        headers
      ).then(data => {
        successCallback(data);
      }).catch(error => {
        errorCallback(error);
      });
    }
    else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log('Data incoming:');
          console.log(this);
          successCallback({ 'data': this.responseText });
        }
      }
      xhr.open('POST', addr, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/json';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send(JSON.stringify(parameters));
    }
  }

  public PUT(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      let HttpRequest = new HTTP();
      HttpRequest.setDataSerializer('json');
      HttpRequest.put(
        addr,
        parameters,
        headers
      ).then(data => {
        successCallback(data);
      }).catch(error => {
        errorCallback(error);
      });
    }
    else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log('Data incoming:');
          console.log(this);
          successCallback({ 'data': this.responseText });
        }
      }
      xhr.open('PUT', addr, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/json';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send(JSON.stringify(parameters));
    }
  }

  public PATCH(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      let HttpRequest = new HTTP();
      HttpRequest.setDataSerializer('json');
      HttpRequest.patch(
        addr,
        parameters,
        headers
      ).then(data => {
        successCallback(data);
      }).catch(error => {
        errorCallback(error);
      });
    }
    else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log('Data incoming:');
          console.log(this);
          successCallback({ 'data': this.responseText });
        }
      }
      xhr.open('PATCH', addr, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/json';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send(JSON.stringify(parameters));
    }
  }

  public DELETE(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      let HttpRequest = new HTTP();
      HttpRequest.delete(
        addr + (Object.keys(parameters).length > 0 ? '?' : '') + Object.keys(parameters).map(function (key) { return key + '=' + encodeURIComponent(parameters[key]) }).join('&'),
        {},
        headers
      ).then(data => {
        successCallback(data);
      }).catch(error => {
        errorCallback(error);
      });
    }
    else {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log('Data incoming:');
          console.log(this);
          successCallback({ 'data': this.responseText });
        }
      }
      xhr.open('DELETE', addr + (Object.keys(parameters).length > 0 ? '?' : '') + Object.keys(parameters).map(function (key) { return key + '=' + encodeURIComponent(parameters[key]) }).join('&'), true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (typeof headers != 'object' || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send();
    }
  }

  //#endregion

  //#region [ MÉTODOS DE CODIFICAÇÃO DE EMOJIS ] 

  private EscapeSpecialEntities(str: string): string {
    const SPECIAL_CHARSET = new RegExp(/&#\d{4,6};/ig);
    const FOUND_CHARS = String(str || '').match(SPECIAL_CHARSET) || [];
    let newStr = String(str || '');
    for (let idx = 0; idx < FOUND_CHARS.length; idx++) {
      newStr = newStr.replace(FOUND_CHARS[idx], `\\&\\#${Number(FOUND_CHARS[idx].replace(/[^0-9]/ig, ''))}\\;`);
    }
    return newStr;
  }

  private UnescapeSpecialEntities(str: string): string {
    const SPECIAL_CHARSET = new RegExp(/\\&\\#\d{4,6}\\;/ig);
    const FOUND_CHARS = String(str || '').match(SPECIAL_CHARSET) || [];
    let newStr = String(str || '');
    for (let idx = 0; idx < FOUND_CHARS.length; idx++) {
      newStr = newStr.replace(FOUND_CHARS[idx], `${FOUND_CHARS[idx].replace(/[^&#0-9;]/ig, '')}`);
    }
    return newStr;
  }

  private EncodeEmojiChars(str: string): string {
    const SPECIAL_CHARSET = new RegExp(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/ig);
    const FOUND_CHARS = String(str || '').match(SPECIAL_CHARSET) || [];
    let newStr = String(str || '');
    for (let idx = 0; idx < FOUND_CHARS.length; idx++){
      newStr = newStr.replace(FOUND_CHARS[idx], `&#${FOUND_CHARS[idx].codePointAt(0)};`);
    }
    return newStr;
  }

  private DecodeEmojiChars(str: string): string {
    const SPECIAL_CHARSET = new RegExp(/&#\d{4,6};/ig);
    const FOUND_CHARS = String(str || '').match(SPECIAL_CHARSET) || [];
    let newStr = String(str || '');
    for (let idx = 0; idx < FOUND_CHARS.length; idx++){
      newStr = newStr.replace(FOUND_CHARS[idx], String.fromCodePoint(Number(FOUND_CHARS[idx].replace(/[^0-9]/ig, ''))));
    }
    return newStr;
  }

  //#endregion

  //#region [ CAMADA DE APIS DE AUTENTICAÇÃO ]

  public async AuthRegisterUser(userType: string, userName: string, userEmail: string, userPassword: string, userCpf: string, userCellphone: string, userCampusId: string, userCourseId: string, recaptchaToken: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/auth/register', {
          'user_type': userType,
          'user_name': userName,
          'user_email': userEmail,
          'user_password': userPassword,
          'user_cpf': userCpf,
          'user_cellphone': userCellphone,
          'user_campus_id': userCampusId,
          'user_course_id': userCourseId
        },
        {
          'X-Recaptcha-Token': recaptchaToken
        },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthLoginUser(userAccount: string, password: string, recaptchaToken: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/auth/login', {
        'user': userAccount,
        'password': password
      },
      { 
        'X-App-Version': this.webSettings.getAppVersion(),
        'X-Recaptcha-Token': recaptchaToken
      },
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
      (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthLogoutUser(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/auth/logout',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthForgotPassword(userAccount: string, recaptchaToken: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/auth/password',
        {
          'user': userAccount
        },
        {
          'X-Recaptcha-Token': recaptchaToken
        },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthRequestFirstAccess(userAccount: string, recaptchaToken: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/auth/welcome',
        {
          'user': userAccount
        },
        {
          'X-Recaptcha-Token': recaptchaToken
        },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthResetPassword(token: string, password: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/auth/reset/password',
        {
          'password': password
        },
        {
          'X-Auth-Token': token
        },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  //#endregion

  //#region [ CAMADA DE APIS DE INFORMAÇÕES ]

  public async InfoListCampi(): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/info/campi',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListCourses(campusId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/info/' + encodeURIComponent(campusId) + '/courses',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListLocals(campusId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/info/' + encodeURIComponent(campusId) + '/locals',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListSubjects(courseId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/info/course/' + encodeURIComponent(courseId) + '/subjects',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  //#endregion

  //#region [ CAMADA DE APIS DE GESTORES ]

  public async MgrListPendingUsers(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/users/pending',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrAcceptPendingUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/manager/users/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrRejectPendingUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/users/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrValidateQrCode(qrCode: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/manager/checkin/validate/' + encodeURIComponent(qrCode),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrInvalidateQrCode(qrCode: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/checkout/qrcode/' + encodeURIComponent(qrCode),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrSearchUsers(searchTerm: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/user/search/' + encodeURIComponent(searchTerm),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/user/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/user/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrSearchLocal(searchTerm: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/local/search/' + encodeURIComponent(searchTerm),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailLocal(localId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/local/' + encodeURIComponent(localId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrViewUserByQrCode(qrCode: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/checkin/view/' + encodeURIComponent(qrCode),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateLocal(localName: string, localDescription: string, localCapacity: string, localBlock: string, localFloor: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/manager/local',
        {
          'name': localName,
          'description': localDescription,
          'capacity': localCapacity,
          'block': localBlock,
          'floor': localFloor
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrSearchReserve(searchTerm: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/search/' + encodeURIComponent(searchTerm),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteLocal(localId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/local/' + encodeURIComponent(localId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailReserve(reserveId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/' + encodeURIComponent(reserveId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteReserve(reserveId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/' + encodeURIComponent(reserveId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrPatchReserve(reserveId: string, reserveData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.PATCH(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/' + encodeURIComponent(reserveId),
        {
          'date': reserveData.user_name,
          'begin_time': reserveData.user_cpf,
          'end_time': reserveData.end_time,
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrListCampusMessage(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/message/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { 
          let parsed = JSON.parse(data.data);
          for (let idx = 0; idx < parsed.parameters.length || 0; idx++){
            parsed.parameters[idx].message_body = this.UnescapeSpecialEntities(this.DecodeEmojiChars(parsed.parameters[idx].message_body));
          }
          resolve({ success: true, data: parsed, error: null }); 
        },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateCampusMessage(title: string, body: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/manager/message',
        { 'message_title': title, 'message_body': this.EncodeEmojiChars(this.EscapeSpecialEntities(body)) },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteCampusMessage(messageId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/message/' + encodeURIComponent(messageId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteSubject(courseId: string, subjectId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/manager/course/' + encodeURIComponent(courseId) + '/subject/' + encodeURIComponent(subjectId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateSubject(courseId: string, subjectName: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/manager/course/' + encodeURIComponent(courseId) + '/subject',
        { 'name': subjectName },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrPatchUser(userId: string, userData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.PATCH(this.webSettings.getApiUrlAddress() + '/api/v1/manager/user/' + encodeURIComponent(userId),
        {
          'user_name': userData.user_name,
          'user_cpf': userData.user_cpf,
          'user_cellphone': userData.user_cellphone,
          'user_permissions': userData.user_permissions,
          'campus_id': userData.campus_id,
          'course_id': userData.course_id
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrShowProfile(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/profile',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  //#endregion

  //#region [ CAMADA DE APIS DE ESTUDANTES ]

  public async StdAllReservesAvailable(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/student/reserve/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdJoinReserve(reserveId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/student/reserve/' + encodeURIComponent(reserveId) + '/join',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdLeaveReserve(reserveId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/student/reserve/' + encodeURIComponent(reserveId) + '/leave',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdSubmitAnalysis(analysisData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/student/analysis/submit',
        { 'Data': analysisData },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdListAllMessages(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/student/message/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { 
          let parsed = JSON.parse(data.data);
          for (let idx = 0; idx < parsed.parameters.length || 0; idx++){
            parsed.parameters[idx].message_body = this.UnescapeSpecialEntities(this.DecodeEmojiChars(parsed.parameters[idx].message_body));
          }
          resolve({ success: true, data: parsed, error: null }); 
        },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdCheckinGenerateQrCode(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/student/checkin/qrcode',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdShowProfile(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/student/profile',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  //#endregion

  //#region [ CAMADA DE APIS DE PROFESSORES ]

  public async PfFetchOwnReserves(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/professor/reserve/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfCreateReserve(localId: string, date: string, begin_time: string, end_time: string, subjects: number[], token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/professor/reserve',
        {
          "local_id": localId,
          "date": date,
          "begin_time": begin_time,
          "end_time": end_time,
          "subjects": subjects
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfShowPresences(reserveId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/professor/reserve/' + encodeURIComponent(reserveId) + '/presence/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfConfirmPresence(reserveId: string, userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/professor/reserve/' + encodeURIComponent(reserveId) + '/presence/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfDenyPresence(reserveId: string, userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/professor/reserve/' + encodeURIComponent(reserveId) + '/presence/' + encodeURIComponent(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfListAllMessages(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/professor/message/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { 
          let parsed = JSON.parse(data.data);
          for (let idx = 0; idx < parsed.parameters.length || 0; idx++){
            parsed.parameters[idx].message_body = this.UnescapeSpecialEntities(this.DecodeEmojiChars(parsed.parameters[idx].message_body));
          }
          resolve({ success: true, data: parsed, error: null }); 
        },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfCreateMessage(courseId: string, title: string, body: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + '/api/v1/professor/message/' + encodeURIComponent(courseId),
        { 'message_title': title, 'message_body': this.EncodeEmojiChars(this.EscapeSpecialEntities(body)) },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfDeleteMessage(ownMessageId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + '/api/v1/professor/message/' + encodeURIComponent(ownMessageId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PfShowProfile(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/professor/profile',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  //#endregion

}
