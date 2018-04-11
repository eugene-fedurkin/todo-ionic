import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Network } from '@ionic-native/network';

import { CashService } from '../service/cash-service';
import { ListsService } from '../service/lists-service';
import { ItemsService } from '../service/items-service';
import { LoaderService } from '../service/loader-service';
import { HttpService } from '../service/http-service';
import { StorageService } from '../service/storage-service';

import { MyApp } from './app.component';
import { ListsPage } from '../pages/lists/lists';
import { List } from '../pages/list/list';
import { Items } from '../pages/items/items';
import { Item } from '../pages/item/item';
import { ItemDetailsPage } from '../pages/item-details/item-details';

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
    Item,
    ItemDetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configToFarebase),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListsPage,
    List,
    Items,
    Item,
    ItemDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CashService,
    ListsService,
    ItemsService,
    LoaderService,
    HttpService,
    Network,
    StorageService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule {}
