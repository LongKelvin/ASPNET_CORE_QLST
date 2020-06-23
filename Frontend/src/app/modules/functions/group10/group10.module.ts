import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarAddGroup10Component } from './car-add-group10/car-add-group10.component';
import {InputTextModule} from 'primeng/inputtext';
import { DropdownModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { Group10ServiceProxyModule } from "./group10.service-proxy.module";
import {KeyFilterModule} from 'primeng/keyfilter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    KeyFilterModule,
    Group10ServiceProxyModule
  
  ],
  declarations: [CarAddGroup10Component],
  exports: [CarAddGroup10Component]
})
export class Group10Module { }
