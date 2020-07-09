import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { WebSettingsService } from './web-settings.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {

  constructor(private webSettings: WebSettingsService) { }

  /* Client API interface */
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

  public PUT(addr, parameters, headers, successCallback, errorCallback)
  {
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

  public DELETE(addr, parameters, headers, successCallback, errorCallback)
  {
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
      xhr.open('DELETE', addr +(Object.keys(parameters).length > 0 ? '?' : '') + Object.keys(parameters).map(function (key) { return key + '=' + encodeURIComponent(parameters[key]) }).join('&'), true);
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

  public async RegisterUser(userType: string, userName: string, userEmail: string, userPassword: string, userCpf: string, userCellphone: string, userCampusId: string, userCourseId: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/auth/register', {
        'user_type': userType,
        'user_name': userName,
        'user_email': userEmail,
        'user_password': userPassword,
        'user_cpf': userCpf,
        'user_cellphone': userCellphone,
        'user_campus_id': userCampusId,
        'user_course_id': userCourseId
      },
      {},
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async LoginUser(userAccount: string, password: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/auth/login', {
        'user': userAccount,
        'password': password
      },
      {},
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async LogoutUser(token: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/auth/logout', 
      {},
      {'X-Auth-Token' : token}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async ForgotPassword(userAccount: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/auth/password', 
      {
        'user': userAccount
      },
      {}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async ListCampi() : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/campi', 
      {},
      {}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async ListCourses(campusId: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/' + Number(campusId) + '/courses', 
      {},
      {}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async ListPendingUsers(token: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/pending', 
      {},
      {'X-Auth-Token' : token}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async AcceptPendingUser(userId: string, token: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/' + Number(userId), 
      {},
      {'X-Auth-Token' : token},  
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

  public async RejectPendingUser(userId: string, token: string) : Promise<any>
  {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/' + Number(userId), 
      {},
      {'X-Auth-Token' : token}, 
      (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); }, 
      (error) => { resolve({ success: true, data: null, error: error }); });
    });
  }

}
