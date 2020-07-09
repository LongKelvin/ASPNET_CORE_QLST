import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModelCarAddGroup9Component } from './model-car-add-group9/model-car-add-group9.component';
import { MaintainCarsNotifyAddComponent} from "./maintain-cars-notify-add/maintain-cars-notify-add.component"
import { MaintainCarsNotifyComponent } from "./maintain-cars-notify/maintain-cars-notify.component"
import { Group9ServiceProxyModule } from './group9.service-proxy.module';
import { TableModule } from "primeng/table";
import { AutoCompleteModule } from 'primeng/primeng';
import { UtilsModule } from "@shared/utils/utils.module";
import { DriverScheduleComponent} from "./driver-schedule/driver-schedule.component"
import { DriverScheduleAddComponent} from "./driver-schedule-add/driver-schedule-add.component"
import { DriverScheduleEditComponent} from "./driver-schedule-edit/driver-schedule-edit.component"
import { InputTextModule} from 'primeng/inputtext';
import { DropdownModule } from 'primeng/primeng';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Group9ServiceProxyModule,
    TableModule,
    RouterModule,
    UtilsModule,
    AutoCompleteModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    
  ],
  declarations: [ModelCarAddGroup9Component, MaintainCarsNotifyAddComponent,MaintainCarsNotifyComponent,
  DriverScheduleEditComponent,DriverScheduleComponent,DriverScheduleAddComponent],  
   
  exports:[ModelCarAddGroup9Component,MaintainCarsNotifyAddComponent,MaintainCarsNotifyComponent,
  DriverScheduleEditComponent,DriverScheduleComponent,DriverScheduleAddComponent
  ]

})

export class Group9Module { }

