import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { WebSettingsService } from './web-settings.service';

export interface UserData {
  user_name: null,
  user_cpf: null,
  user_cellphone: null,
  user_permissions: null,
  campus_id: null,
  course_id: null
}
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

  public async AuthRegisterUser(userType: string, userName: string, userEmail: string, userPassword: string, userCpf: string, userCellphone: string, userCampusId: string, userCourseId: string): Promise<any> {
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
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthLoginUser(userAccount: string, password: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/auth/login', {
        'user': userAccount,
        'password': password
      },
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthLogoutUser(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/auth/logout',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async AuthForgotPassword(userAccount: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/auth/password',
        {
          'user': userAccount
        },
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListCampi(): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/campi',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListCourses(campusId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/' + Number(campusId) + '/courses',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListLocals(campusId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/' + Number(campusId) + '/locals',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async InfoListSubjects(courseId: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/info/course/' + Number(courseId) + '/subjects',
        {},
        {},
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrListPendingUsers(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/pending',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrAcceptPendingUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/' + Number(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrRejectPendingUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/users/' + Number(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrValidateQrCode(qrCode: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/checkin/validate/' + qrCode,
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrSearchUsers(searchTerm: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/user/search/' + searchTerm,
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/user/' + Number(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteUser(userId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/user/' + Number(userId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrSearchLocal(searchTerm: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/local/search/' + String(searchTerm),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailLocal(localId: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/local/' + Number(localId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrViewUserByQrCode(qrCode: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/checkin/view/' + Number(qrCode),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateLocal(localName: string, localDescription: string, localCapacity: string, localBlock: string, localFloor: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/local',
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
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/search/' + String(searchTerm),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteLocal(localId: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/local/' + Number(localId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDetailReserve(reserveId: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/reserve/' + Number(reserveId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteReserve(reserveId: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/reserve/' + Number(reserveId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrPatchReserve(reserveId: number, userData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.PATCH(this.webSettings.getApiUrlAddress() + '/api/v1/manager/reserve/' + Number(reserveId),
        {
          'date': userData.user_name,
          'begin_time': userData.user_cpf,
          'end_time': userData.end_time,
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrListCampusMessage(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + 'api/v1/manager/message/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateCampusMessage(title: string, body: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/message',
        { 'message_title': title, 'message_body': body },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteCampusMessage(messageId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/message/' + Number(messageId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrDeleteSubject(courseId: string, subjectId: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + 'api/v1/manager/course/' + Number(courseId) + '/subject/' + Number(subjectId),
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrCreateSubject(courseId: string, subjectName: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + 'api/v1/manager/course/' + Number(courseId) + '/subject',
        { 'name': subjectName },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async MgrPatchUser(userId: string, userData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.PATCH(this.webSettings.getApiUrlAddress() + '/api/v1/manager/user/' + Number(userId),
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

  public async StdReserveAllAvailable(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/student/reserve/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async StdJoinReserve(reserveId: number, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.POST(this.webSettings.getApiUrlAddress() + `/api/v1/student/reserve/${Number(reserveId)}/join`,
        {},
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
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
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

  public async StdCheckout(qrCode: string, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.DELETE(this.webSettings.getApiUrlAddress() + `/api/v1/student/checkout/qrcode/${qrCode}`,
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PrfListAllMessages(token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + '/api/v1/professor/message/all',
        {},
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

  public async PrfCreateMessage(courseId: number, reserveData: any, token: string): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.GET(this.webSettings.getApiUrlAddress() + `/api/v1/professor/message/${courseId}`,
        {
          'message_title': reserveData.message_title,
          'message_body': reserveData.message_body,
        },
        { 'X-Auth-Token': token },
        (data) => { resolve({ success: true, data: JSON.parse(data.data), error: null }); },
        (error) => { resolve({ success: false, data: null, error: error }); });
    });
  }

}
