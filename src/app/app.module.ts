import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { DatabaseModule } from '@angular/fire/database'
import { MessagesService } from './services/messages.service';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { LoginModule } from './pages/login/login.module';
import { ChatModule } from './pages/chat/chat.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        MessagesService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        DatabaseModule,
        HttpClientModule,
        LoginModule,
        ChatModule
    ]
})
export class AppModule {}
