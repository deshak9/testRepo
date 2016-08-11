import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './app.component';
//import {ChatComponent} from './JonuMQClient/chat'
import {enableProdMode} from '@angular/core';
enableProdMode();

bootstrap(AppComponent, [HTTP_PROVIDERS]);
//bootstrap(ChatComponent);
