import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintainCarsComponent } from './maintain-cars/maintain-cars.component';
import { MaintainCarsRequestComponent } from './maintain-cars-request/maintain-cars-request.component';
import { MaintainCarsNotifyComponent } from './maintain-cars-notify/maintain-cars-notify.component';
import { MaintainCarsNotifyAddComponent } from './maintain-cars-notify-add/maintain-cars-notify-add.component';
import { ModulesRoutingModule } from '../modules-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule, CheckboxModule } from 'primeng/primeng';
import { FunctionsModule } from '../functions/functions.module';

@NgModule({
    imports: [
        CommonModule,
        ModulesRoutingModule,
        FormsModule,
        TableModule,
        CalendarModule,
        CheckboxModule,
        FunctionsModule
    ],
    declarations: [
        MaintainCarsComponent,
        MaintainCarsRequestComponent,
        MaintainCarsNotifyComponent,
        MaintainCarsNotifyAddComponent
    ]
})
export class MaintainCarsModule { }
