import { HTTP, HTTPResponse } from "@ionic-native/http/ngx";
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
      xhr.responseType = "text";
      xhr.open("GET", addr + "?" + Object.keys(parameters).map(function (key) { return key + "=" + encodeURIComponent(parameters[key]) }).join("&"), true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log("Data incoming:");
          console.log(this);
          successCallback({ "data": this.responseText });
        }
      }
      if (typeof headers != "undefined" || headers === null) {
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
      if (typeof headers != "object" || headers === null) {
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
      xhr.responseType = "text";
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log("Data incoming:");
          console.log(this);
          successCallback({ "data": this.responseText });
        }
      }
      xhr.open("POST", addr, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (typeof headers != "object" || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/json';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send(parameters);
    }
  }

  public PUT(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != "object" || headers === null) {
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
      xhr.responseType = "text";
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log("Data incoming:");
          console.log(this);
          successCallback({ "data": this.responseText });
        }
      }
      xhr.open("PUT", addr, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (typeof headers != "object" || headers === null) {
        headers = {};
      }
      headers['Content-Type'] = 'application/json';
      for (let prop in headers) {
        xhr.setRequestHeader(prop, headers[prop]);
      }
      xhr.onerror = errorCallback;
      xhr.send(parameters);
    }
  }

  public DELETE(addr, parameters, headers, successCallback, errorCallback) {
    if (!this.webSettings.getDebugModeState()) {
      if (typeof headers != "object" || headers === null) {
        headers = {};
      }
      let HttpRequest = new HTTP();
      HttpRequest.delete(
        addr + (Object.keys(parameters).length > 0 ? '?' : '') + Object.keys(parameters).map(function (key) { return key + "=" + encodeURIComponent(parameters[key]) }).join("&"), 
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
      xhr.responseType = "text";
      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log("Data incoming:");
          console.log(this);
          successCallback({ "data": this.responseText });
        }
      }
      xhr.open("DELETE", addr +(Object.keys(parameters).length > 0 ? '?' : '') + Object.keys(parameters).map(function (key) { return key + "=" + encodeURIComponent(parameters[key]) }).join("&"), true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      if (typeof headers != "object" || headers === null) {
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

}
