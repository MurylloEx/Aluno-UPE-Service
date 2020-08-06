import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSettingsService {

  private debugModeState: boolean = false;
  private apiUrlAddress: string = 'https://www.api-upe.fun';

  constructor() {}

  public setDebugModeState(bDbgMode: boolean){
    this.debugModeState = bDbgMode;
  }

  public getDebugModeState(){
    return this.debugModeState;
  }

  public setApiUrlAddress(apiUrl: string){
    this.apiUrlAddress = apiUrl;
  }

  public getApiUrlAddress(){
    return this.apiUrlAddress;
  }

}
