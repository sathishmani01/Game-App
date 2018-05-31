import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FlimDetailsComponent } from './flim-details/flim-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlimServiceService } from './service/flim-service.service';
import { FlimTitlesPipe } from './flim-titles.pipe';
import { FlimTitlePipe } from './flim-title.pipe'
import { DropdownModule, SplitButtonModule, MenuModule, InputTextModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    AppComponent,
    FlimDetailsComponent,
    NavBarComponent,
    FlimTitlesPipe,
    FlimTitlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DropdownModule,
    AutoCompleteModule,
    NgxPaginationModule
  ],
  providers: [FlimServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
