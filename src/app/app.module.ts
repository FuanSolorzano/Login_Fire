import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"login-app-b47e6","appId":"1:719996699278:web:3b8dac9e011a7902917fdf","storageBucket":"login-app-b47e6.appspot.com","apiKey":"AIzaSyDYvaHCDQQysMvarxKBBvUqWEGk1z_68e0","authDomain":"login-app-b47e6.firebaseapp.com","messagingSenderId":"719996699278"})), provideAuth(() => getAuth()),
  AngularFireModule,AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
