import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DxCarEditGroup8Component } from './dx-car-edit-group8/dx-car-edit-group8.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { Group8ServiceProxyModule } from './group8.service-proxy.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextareaModule,
    Group8ServiceProxyModule,
    ReactiveFormsModule
  ],
  declarations: [DxCarEditGroup8Component],
  exports: [DxCarEditGroup8Component]
})
export class Group8Module {


}
