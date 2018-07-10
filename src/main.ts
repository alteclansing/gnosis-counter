import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as firebase from 'firebase';
import { config } from './config/firebase-config.js';


import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(config);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
