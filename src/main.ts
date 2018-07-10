import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as firebase from 'firebase';


import 'hammerjs';

if (environment.production) {
  enableProdMode();
}
const config = {
  apiKey: 'AIzaSyANUZczCqjaQT2t1NuMHhaaa0wWdEEtZJE',
  authDomain: 'gnosiscounter.firebaseapp.com',
  databaseURL: 'https://gnosiscounter.firebaseio.com',
  projectId: 'gnosiscounter',
  storageBucket: 'gnosiscounter.appspot.com',
  messagingSenderId: '397480090874'
};
firebase.initializeApp(config);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
