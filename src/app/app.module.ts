import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {  MessageService } from 'primeng/api';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,


  ],
  exports:[],
  providers: [MessageService,
    AppService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppService],
      useFactory: (service: AppService) => {
        return () => {
          return service.init();
        };
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
