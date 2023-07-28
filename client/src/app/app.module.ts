import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//___________ Fetching Data from API by  HttpClient _________________
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';

//___________ Forms Modules _________________
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent ,
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
