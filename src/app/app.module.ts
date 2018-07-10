import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  {path: '', component: AppComponent, data: {title: 'Gnosis Counter'}},
  {path: '**', component: AppComponent}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
