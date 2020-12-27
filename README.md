<h1 align="center">Biblioteca Aluno UPE (Driver)</h1>
<p align="center">Essa biblioteca foi feita para conectar com o endpoint HTTPS do aplicativo Aluno UPE.</p>

<p align="center">
    <img src="https://badgen.net/npm/v/@rebase-team/lib-aluno-upe"/> 
    <img src="https://badgen.net/npm/dt/@rebase-team/lib-aluno-upe"/>
    <img src="https://badgen.net/npm/license/@rebase-team/lib-aluno-upe"/>
    <img src="https://badgen.net/npm/types/@rebase-team/lib-aluno-upe"/>
    <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

Para utilizá-la vocês precisa de uma aplicação Angular e utilizar o comando descrito na seção abaixo.

## Instalação

```sh
ionic cordova plugin add cordova-plugin-advanced-http
npm install @ionic-native/http
npm install @rebase-team/lib-aluno-upe
```

## Exemplos de uso

``> APPMODULE.TS``
```typescript
import { HTTP } from "@ionic-native/http/ngx";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WebRequestsService } from "@rebase-team/lib-aluno-upe";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot()
  ],
  providers: [
    HTTP,
    WebRequestsService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

```

``> HOME.PAGE.TS``
```typescript
import { WebSettingsService, WebResponses, WebRequestsService } from "@rebase-team/lib-aluno-upe";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {

  constructor(
    private alunoApiSettings: WebSettingsService,
    private alunoApi: WebRequestsService
  ) {
    this.alunoApiSettings.setDebugModeState(true);
    this.alunoApiSettings.setAppVersion('5.1.43');
  }

}
```

## Metadados

Muryllo Pimenta de Oliveira – muryllo.pimenta@upe.br

Distribuído sobre a licença MIT. Veja ``LICENSE`` para mais informações.

## Contribuição

1. Fork it (<https://github.com/MurylloEx/Aluno-UPE-Service/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

