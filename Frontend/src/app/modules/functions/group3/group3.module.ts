import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DxCarAddGroup3Component } from './dx-car-add-group3/dx-car-add-group3.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Group3ServiceProxyModule} from './group3.service-proxy.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextareaModule,
    Group3ServiceProxyModule
  ],
  declarations: [DxCarAddGroup3Component],
  exports: [DxCarAddGroup3Component]
})
export class Group3Module { }
