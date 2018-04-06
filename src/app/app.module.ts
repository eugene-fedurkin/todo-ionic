import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListsPage } from '../pages/lists/lists';
import { List } from '../pages/list/list';
import { Items } from '../pages/items/items';
import { Item } from '../pages/item/item';

const configToFarebase = {
  apiKey: "AIzaSyBaG7kLeAUWVYYyhLDSVuMe7RHVEIUdVps",
  authDomain: "test-task-23751.firebaseapp.com",
  databaseURL: "https://test-task-23751.firebaseio.com",
  projectId: "test-task-23751",
  storageBucket: "",
  messagingSenderId: "511989202846"
};

@NgModule({
  declarations: [
    MyApp,
    ListsPage,
    List,
    Items,
    Item
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configToFarebase),
    AngularFireStorageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListsPage,
    List,
    Items,
    Item
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
