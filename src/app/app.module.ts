import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"

FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    FusionChartsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
