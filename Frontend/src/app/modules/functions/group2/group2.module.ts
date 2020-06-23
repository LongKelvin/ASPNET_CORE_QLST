import { Group2RoutingModule } from './group2.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarSubGroup2Component } from './car-sub-group2/car-sub-group2.component';
import { Group2ServiceProxyModule } from './group2.service-proxy.module';

@NgModule({
  imports: [
    Group2RoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    Group2ServiceProxyModule
  ],
  declarations: [CarSubGroup2Component],
  exports: [CarSubGroup2Component]
})
export class Group2Module { }
