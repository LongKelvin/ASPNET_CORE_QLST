import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DxCarPdGroup7Component } from './dx-car-pd-group7/dx-car-pd-group7.component';
import { ScrollPanelModule, PanelModule, InputTextareaModule, DialogModule, OrderListModule, RadioButtonModule } from 'primeng/primeng';
import { Group7ServiceProxyModule } from './group7.service-proxy.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ScrollPanelModule,
    PanelModule,
    InputTextareaModule,
    DialogModule,
    OrderListModule,
    RadioButtonModule,
    Group7ServiceProxyModule,
    ReactiveFormsModule
  ],
  declarations: [DxCarPdGroup7Component],
  exports:[DxCarPdGroup7Component],
})
export class Group7Module { }
